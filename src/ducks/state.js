import {createSelector} from 'reselect';
import {fromJS, List} from 'immutable';

import * as utils from '../utils/duckHelpers';
import {responsive} from '../constants';

export const types = {
	OFFMENU_TOGGLE: 'OFFMENU_TOGGLE',
	OFFMENU_SHOW: 'OFFMENU_SHOW',
	OFFMENU_HIDE: 'OFFMENU_HIDE',
	REGISTER_PROMO: 'REGISTER_PROMO',
	OFFMENU_RESET: 'OFFMENU_RESET',
	WINDOW_RESIZE: 'WINDOW_RESIZE',
	VIDEO_MODAL_ADD: 'VIDEO_MODAL_ADD'
};

export const actions = {
	offmenuToggle: name => utils.action(types.OFFMENU_TOGGLE, {name}),
	offmenuShow: name => utils.action(types.OFFMENU_SHOW, {name}),
	offmenuHide: name => utils.action(types.OFFMENU_HIDE, {name}),
	windowResize: payload => utils.action(types.WINDOW_RESIZE, {payload}),
	addVideoModal: payload => utils.action(types.VIDEO_MODAL_ADD, {payload})
};

export const initialState = utils.initialState({
	offmenu: {
		menu: false,
		search: false,
		megaMenu: false
	},
	windowSize: {
		width: window.innerWidth,
		height: window.innerHeight
	},
	isCollapsed: window.innerWidth < responsive.collapse,
	videoModals: []
});

export default (state = initialState, action) => {
	switch (action.type) {
		case types.WINDOW_RESIZE:
			return state.set('windowSize', fromJS({...action.payload})).set('isCollapsed', action.payload.width < responsive.collapse);
		case types.OFFMENU_TOGGLE:
			return state.withMutations(s => {
				let currentState = s.get('offmenu');
				let parts = action.name.split('.');

				s.set('offmenu', initialState.get('offmenu').setIn(parts, !currentState.getIn(parts)));
			});
		case types.OFFMENU_SHOW:
			return state.withMutations(s => {
				let parts = action.name.split('.');

				s.set('offmenu', initialState.get('offmenu').setIn(parts, true));
			});
		case types.OFFMENU_HIDE:
			return state.withMutations(s => {
				let parts = action.name.split('.');

				s.set('offmenu', initialState.get('offmenu').setIn(parts, false));
			});
		case types.OFFMENU_RESET:
			return state.set('offmenu', initialState.get('offmenu'));
		case types.VIDEO_MODAL_ADD:
			return state.update('videoModals', u => {
				action.payload.forEach(video => {
					if (video && video !== '' && u.indexOf(video) === -1) {
						u = u.push(video);
					}
				});

				return u;
			});
		default:
			return state;
	}
};

const getState = state => state.get('state');
const getParams = (state, param) => (param ? state.getIn(['state', 'params', param]) : state.getIn(['state', 'params']));
const getOffmenu = (state, name) => {
	if (name) {
		const parts = name.split('.');

		return state.getIn(['state', 'offmenu'].concat(parts));
	}

	return state.getIn(['state', 'offmenu']);
};

export const selectors = {
	getState: createSelector([getState], s => s),
	getParams: createSelector([getParams], params => params),
	getOffmenu: createSelector([getOffmenu], o => o)
};
