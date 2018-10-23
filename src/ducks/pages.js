import {List} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';
import {getData} from '../services/cache';
import {currentPage} from '../utils/contentfulHelpers';

export const types = {
	PAGES_UPDATE: 'PAGES_UPDATE',
	PAGES_GET: 'PAGES_GET'
};

export const actions = {
	pagesGet: obj => utils.action(types.PAGES_GET, obj)
};

const initialState = getData('pages') || List();

export default (state = initialState, action) => {
	switch (action.type) {
		case types.PAGES_UPDATE:
			return utils.updateList(state, action.payload);

		default:
			return state;
	}
};

const getPages = state => state.get('pages');
const getPage = (state, slug) => currentPage(state.get('pages'), slug);

export const selectors = {
	getPages: createSelector([getPages], pages => pages),
	getPage: createSelector([getPage], page => page)
};
