import {List} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';
import {getData} from '../services/cache';

export const types = {
	PLATFORMS_UPDATE: 'PLATFORMS_UPDATE',
	PLATFORMS_GET: 'PLATFORMS_GET'
};

export const actions = {
	platformsGet: obj => utils.action(types.PLATFORMS_GET, obj)
};

const initialState = getData('platforms') || List();

export default (state = initialState, action) => {
	switch (action.type) {
		case types.PLATFORMS_UPDATE:
			return utils.updateList(state, action.payload);

		default:
			return state;
	}
};

const getPlatforms = state => state.get('platforms');

export const selectors = {
	getPlatforms: createSelector([getPlatforms], platforms => platforms),
	getWebsiteSettings: createSelector([getPlatforms], platforms => platforms.find(p => p.getIn(['fields', 'platform']) === 'website'))
};
