import {Component} from 'react';
import PropTypes from 'prop-types';

import {ScrollToHelper} from '../../utils/componentHelpers';
import {analytics} from '../../utils/trackingHelpers';

export default class HashScroller extends Component {
	constructor(props) {
		super(props);

		this.scrollChecker = null;
		this.scrollRef = null;

		this.init = this.init.bind(this);
	}

	static propTypes = {
		location: PropTypes.object.isRequired,
		children: PropTypes.node.isRequired
	};

	componentDidMount() {
		document.addEventListener('readystatechange', this.init);
		this.pathChanged();
	}

	componentDidUpdate(prevProps) {
		const pathChanged = prevProps.location.pathname !== this.props.location.pathname;
		// If the location has changed
		if (pathChanged || prevProps.location.hash !== this.props.location.hash) {
			this.locationChanged();
		}

		if (pathChanged) {
			this.pathChanged();
		}
	}

	componentWillUnmount() {
		document.removeEventListener('readystatechange', this.init);
	}

	init() {
		if (document.readyState === 'complete') {
			this.locationChanged();
		}
	}

	pathChanged() {
		window.scrollTo(0, 0);
		analytics('page', this.props.location.pathname);
	}

	locationChanged() {
		if (!this.props.location.hash || this.props.location.hash === '') {
			return;
		}

		this.scrollChecker = setInterval(() => {
			const target = document.querySelector(this.props.location.hash);

			if (target) {
				this.scrollToTarget(target);
			}
		}, 150);
	}

	scrollToTarget(target) {
		clearInterval(this.scrollChecker);

		if (!target) {
			return;
		}

		this.scrollRef = new ScrollToHelper(target, {
			duration: 500,
			container: window
		});
	}

	render() {
		return this.props.children;
	}
}
