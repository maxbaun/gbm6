import {List} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';

export const types = {
	PAGES_UPDATE: 'PAGES_UPDATE',
	PAGES_GET: 'PAGES_GET'
};

export const actions = {
	pages: obj => utils.action(types.PAGES_GET, obj)
};

const initialState = List();

export default (state = initialState, action) => {
	switch (action.type) {
		case types.PAGES_UPDATE:
			return utils.updateList(state, action.payload);

		default:
			return state;
	}
};

const getPages = state => state.get('pages');

export const selectors = {
	getPages: createSelector([getPages], pages => pages)
};
