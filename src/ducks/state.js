import {createSelector} from 'reselect';
import {fromJS, List} from 'immutable';

import * as utils from '../utils/duckHelpers';
import {responsive} from '../constants';
import {getLightboxId} from '../utils/componentHelpers';

export const types = {
	OFFMENU_TOGGLE: 'OFFMENU_TOGGLE',
	OFFMENU_TOGGLE_WITH_DATA: 'OFFMENU_TOGGLE_WITH_DATA',
	OFFMENU_DATA_SET: 'OFFMENU_DATA_SET',
	OFFMENU_SHOW: 'OFFMENU_SHOW',
	OFFMENU_HIDE: 'OFFMENU_HIDE',
	REGISTER_PROMO: 'REGISTER_PROMO',
	OFFMENU_RESET: 'OFFMENU_RESET',
	WINDOW_RESIZE: 'WINDOW_RESIZE',
	VIDEO_MODAL_ADD: 'VIDEO_MODAL_ADD',
	LIGHTBOX_ADD: 'LIGHTBOX_ADD',
	STATUS_CHANGE: 'STATUS_CHANGE',
	ANGLE_SET: 'ANGLE_SET',
	FULL_ANGLE_SET: 'FULL_ANGLE_SET',
	PAGE_TRANSITION_START: 'PAGE_TRANSITION_START',
	PAGE_TRANSITION_END: 'PAGE_TRANSITION_END'
};

export const actions = {
	offmenuToggle: name => utils.action(types.OFFMENU_TOGGLE, {name}),
	offmenuToggleWithData: payload => utils.action(types.OFFMENU_TOGGLE_WITH_DATA, {payload}),
	offmenuShow: name => utils.action(types.OFFMENU_SHOW, {name}),
	offmenuHide: name => utils.action(types.OFFMENU_HIDE, {name}),
	windowResize: payload => utils.action(types.WINDOW_RESIZE, {payload}),
	addVideoModal: payload => utils.action(types.VIDEO_MODAL_ADD, {payload}),
	angleSet: payload => utils.action(types.ANGLE_SET, {payload}),
	fullAngleSet: payload => utils.action(types.FULL_ANGLE_SET, {payload}),
	pageTransitionStart: () => utils.action(types.PAGE_TRANSITION_START),
	pageTransitionEnd: () => utils.action(types.PAGE_TRANSITION_END),
	statusChange: obj => utils.action(types.STATUS_CHANGE, obj)
};

export const initialState = utils.initialState({
	offmenu: {
		menu: false,
		search: false,
		megaMenu: false
	},
	offmenuData: {},
	windowSize: {
		width: window.innerWidth,
		height: window.innerHeight
	},
	angle: 0,
	fullAngle: 0,
	status: {},
	pageTransitioning: false,
	isCollapsed: window.innerWidth < responsive.collapse,
	videoModals: [],
	lightboxes: []
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
		case types.OFFMENU_DATA_SET:
			return state.setIn(['offmenuData', action.payload.name], fromJS(action.payload.data));
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
		case types.STATUS_CHANGE:
			return state.updateIn(['status', action.fetch], u => {
				if (!u) {
					return fromJS(action.payload);
				}

				return u.merge(fromJS(action.payload));
			});
		case types.ANGLE_SET:
			return state.set('angle', fromJS(action.payload));
		case types.FULL_ANGLE_SET:
			return state.set('fullAngle', fromJS(action.payload));
		case types.VIDEO_MODAL_ADD:
			return state.update('videoModals', u => {
				action.payload.forEach(video => {
					if (video && video !== '' && u.indexOf(video) === -1) {
						u = u.push(video);
					}
				});

				return u;
			});
		case types.LIGHTBOX_ADD:
			return state.update('lightboxes', l => {
				action.payload.forEach(video => {
					if (video && video !== '' && l.indexOf(video) === -1) {
						const lightBoxId = getLightboxId(video);
						const existingIndex = l.findIndex(lb => lb.get('id') === lightBoxId);

						if (existingIndex === -1) {
							l = l.push(
								fromJS({
									id: getLightboxId(video),
									images: video.getIn(['fields', 'images'])
								})
							);
						}
					}
				});

				return l;
			});
		case types.PAGE_TRANSITION_START:
			return state.set('pageTransitioning', true);
		case types.PAGE_TRANSITION_END:
			return state.set('pageTransitioning', false);
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
	getOffmenu: createSelector([getOffmenu], o => o),
	getErrors: createSelector([getState], state => {
		const status = state.get('status');

		if (status.isEmpty()) {
			return List();
		}

		return status.reduce((list, s) => {
			const hasError = s.get('error') && s.get('error') !== '';

			return hasError ? list.push(s.get('error')) : list;
		}, List());
	})
};
