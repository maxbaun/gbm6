import {List} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';
import {getData} from '../services/cache';
import {currentMenu} from '../utils/contentfulHelpers';

export const types = {
	MENUS_UPDATE: 'MENUS_UPDATE',
	MENUS_GET: 'MENUS_GET'
};

export const actions = {
	menusGet: obj => utils.action(types.MENUS_GET, obj)
};

const initialState = getData('menus') || List();

export default (state = initialState, action) => {
	switch (action.type) {
		case types.MENUS_UPDATE:
			return utils.updateList(state, action.payload);

		default:
			return state;
	}
};

const getMenus = state => state.get('menus');
const getMenu = (state, location) => currentMenu(state.get('menus'), location);

export const selectors = {
	getMenus: createSelector([getMenus], menus => menus),
	getMenu: createSelector([getMenu], menu => menu)
};
