import {List} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';
import {getData} from '../services/cache';
import {currentPage} from '../utils/contentfulHelpers';
import {shouldCache} from '../constants';

export const types = {
	VIDEOS_UPDATE: 'VIDEOS_UPDATE',
	VIDEOS_GET: 'VIDEOS_GET',
	VIDEOS_INIT: 'VIDEOS_INIT'
};

export const actions = {
	videosGet: obj => utils.action(types.VIDEOS_GET, obj),
	videosInit: obj => utils.action(types.VIDEOS_INIT, obj)
};

const initialState = shouldCache ? getData('videos') || List() : List();

export default (state = initialState, action) => {
	switch (action.type) {
		case types.VIDEOS_UPDATE:
			return utils.updateList(state, action.payload);

		default:
			return state;
	}
};

const getVideos = state => state.get('videos');
const getVideo = (state, slug) => currentPage(state.get('videos'), slug);

export const selectors = {
	getVideos: createSelector([getVideos], videos => videos),
	getVideo: createSelector([getVideo], video => video)
};
