import {List} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';

export const types = {
	SEARCH_SET: 'SEARCH_SET',
	SEARCH_GET: 'SEARCH_GET',
	SEARCH_RESET: 'SEARCH_RESET'
};

export const actions = {
	searchGet: obj => utils.action(types.SEARCH_GET, obj)
};

const initialState = List();

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SEARCH_SET:
			return utils.updateList(state, action.payload);
		case types.SEARCH_RESET:
			return initialState;

		default:
			return state;
	}
};

const getSearch = state => state.get('search');

export const selectors = {
	getSearch: createSelector([getSearch], search => search)
};
