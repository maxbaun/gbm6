import uuid from 'uuid/v4';
import {List, Map, fromJS, Range} from 'immutable';

import {responsive} from '../constants';

export function unique() {
	return uuid();
}

export function noop() {}

export function fire(actions, func, val) {
	return e => {
		let _func = actions[func];

		return actions && func && typeof _func === 'function' ? _func(val || e) : null;
	};
}

export function click(func, val) {
	return e => (func && typeof func === 'function' ? func(val || typeof val !== 'undefined' ? val : e) : null);
}

export function clickPrevent(func, val) {
	return e => {
		e.preventDefault();
		e.stopPropagation();
		click(func, val)(e);
	};
}

export function imageLoaded(func, val) {
	return e => {
		if (func && typeof func === 'function') {
			func(val || typeof val !== 'undefined' ? val : e);
		}
	};
}

export function key(func, val) {
	return e => (func && typeof func === 'function' ? func(val || e) : null);
}

export function enter(func) {
	return e => {
		return func && typeof func === 'function' && e.keyCode === 13 ? func() : null;
	};
}

export function escape(func) {
	return keyCode => {
		return func && typeof func === 'function' && keyCode === 27 ? func() : null;
	};
}

export function state(func, key) {
	return e => (func && typeof func === 'function' ? func({[key]: e.target.value}) : null);
}

export function input(func, val) {
	return e => (func && typeof func === 'function' ? func(val || e.target.value) : null);
}

export function ref(target) {
	return e => {
		this[target] = e;
	};
}

export function isLoading(fetch, state) {
	return state.getIn(['status', fetch, 'loading']);
}

export function getError(fetch, state) {
	return state.getIn(['status', fetch, 'error']);
}

export function getSuccess(fetch, state) {
	return state.getIn(['status', fetch, 'success']);
}

export function topPosition(element) {
	if (!element) {
		return 0;
	}

	return element.offsetTop + topPosition(element.offsetParent);
}

export function absolutePosition(element) {
	const bodyRect = document.body.getBoundingClientRect();
	const clientRect = element.getBoundingClientRect();

	return {
		top: clientRect.top - bodyRect.top,
		left: clientRect.left - bodyRect.top
	};
}

export function intToList(int, properties = List()) {
	let list = List();

	for (let x = 1; x <= int; x++) {
		let obj = Map();

		if (properties && !properties.count()) {
			obj = x;
		} else {
			obj = properties.reduce((map, property) => {
				return map.set(property, x);
			}, Map());
		}

		list = list.push(obj);
	}

	return list;
}

export function camelCase(str) {
	return str
		.replace(/\s(.)/g, later => later.toUpperCase())
		.replace(/\s/g, '')
		.replace(/^(.)/, first => first.toLowerCase());
}

export class ScrollToHelper {
	constructor(target, {container, offset = 0, duration = 1000, easing = easeInOutQuad, callback = noop}) {
		this.options = {
			duration,
			offset,
			callback,
			easing
		};

		this.lastTime = 0;
		this.target = typeof target === 'string' ? document.querySelector(target) : target;
		this.container = typeof container === 'string' ? document.querySelector(container) : container;

		this.paddingTop = parseInt(window.getComputedStyle(this.target).getPropertyValue('padding-top'), 10);

		this.start = window === this.container ? this.container.pageYOffset : this.container.scrollTop;
		this.distance = topPosition(this.target) - this.start + this.options.offset + (this.paddingTop || 0);

		this.requestAnimationFrame = this.requestAnimationFrame.bind(this);
		this.loop = this.loop.bind(this);
		this.end = this.end.bind(this);

		this.requestAnimationFrame(time => {
			this.timeStart = time;
			this.loop(time);
		});
	}

	loop(time) {
		this.timeElapsed = time - this.timeStart;
		this.next = this.options.easing(this.timeElapsed, this.start, this.distance, this.options.duration);

		this.container.scroll(0, this.next);

		if (this.timeElapsed < this.options.duration) {
			this.requestAnimationFrame(time => this.loop(time));
		} else {
			this.end();
		}
	}

	requestAnimationFrame(callback) {
		let currTime = new Date().getTime();
		let timeToCall = Math.max(0, 16 - (currTime - this.lastTime));
		let id = window.setTimeout(() => {
			callback(currTime + timeToCall);
		}, timeToCall);
		this.lastTime = currTime + timeToCall;
		return id;
	}

	end() {
		if (typeof this.options.callback === 'function') {
			this.options.callback();
		}

		this.timeStart = null;
	}
}

export const graphImages = images => {
	if (!images || images.count() === 0) {
		return List();
	}

	return images.map(i => {
		return fromJS({
			src: i.getIn(['src', 'publicURL']),
			caption: i.get('caption')
		});
	});
};

export function price(price) {
	if (!price) {
		return '$0.00';
	}

	return `$${price.toFixed(2)}`;
}

export function stripHtml(string) {
	return string.replace(/<\/?[^>]+(>|$)/g, '');
}

export function coordinates(location) {
	return `Lng: ${location.getIn(['geometry', 'coordinates', 0])} // Lat: ${location.getIn(['geometry', 'coordinates', 1])}`;
}

export function easeInOutQuad(t, b, c, d) {
	t /= d / 2;
	if (t < 1) {
		return (c / 2) * t * t + b;
	}
	t--;

	return (-c / 2) * (t * (t - 2) - 1) + b;
}

export function innerHtml(html) {
	return {__html: html};
}

export function windowWidthChange(props1, props2) {
	const {width: width1} = props1.state.get('windowSize').toJS();
	const {width: width2} = props2.state.get('windowSize').toJS();

	return width1 !== width2;
}

export function sectionAngleHeight(state) {
	const {width: windowWidth} = state.get('windowSize').toJS();
	if (windowWidth > responsive.desktop) {
		return 250;
	}

	if (windowWidth > responsive.collapse) {
		return 200;
	}

	if (windowWidth > responsive.mobile) {
		return 150;
	}

	return 100;
}

export function sectionAngle(state) {
	const {width: windowWidth} = state.get('windowSize').toJS();
	if (windowWidth > responsive.desktop) {
		return 20;
	}

	if (windowWidth > responsive.collapse) {
		return 15;
	}

	if (windowWidth > responsive.mobile) {
		return 10;
	}

	return 5;
}

export function vimeoId(url) {
	var match = /vimeo.*\/(\d+)/i.exec(url);

	if (!match) {
		return;
	}

	return match[1];
}

export function debounce(func, wait, immediate) {
	var timeout;

	return () => {
		var context = this;
		var args = arguments;

		var later = () => {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};

		var callNow = immediate && !timeout;

		clearTimeout(timeout);

		timeout = setTimeout(later, wait);

		if (callNow) {
			func.apply(context, args);
		}
	};
}

export function chunkList(list, chunkSize = 1) {
	return Range(0, list.count(), chunkSize).map(chunkStart => list.slice(chunkStart, chunkStart + chunkSize));
}
