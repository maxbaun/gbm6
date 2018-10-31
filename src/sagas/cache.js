import {takeEvery, all, call, put, select} from 'redux-saga/effects';

import {types as cacheTypes} from '../ducks/cache';
import {selectors as menuSelectors} from '../ducks/menus';
import {selectors as pageSelectors} from '../ducks/pages';
import {selectors as platformSelectors} from '../ducks/platforms';
import {selectors as videoSelectors} from '../ducks/videos';
import {setData, resetCache} from '../services/cache';

export function * watchCache() {
	yield takeEvery(cacheTypes.CACHE_MENUS_SET, onMenusSet);
	yield takeEvery(cacheTypes.CACHE_PAGES_SET, onPagesSet);
	yield takeEvery(cacheTypes.CACHE_PLATFORMS_SET, onPlatformsSet);
	yield takeEvery(cacheTypes.CACHE_VIDEOS_SET, onVideosSet);
	yield takeEvery(cacheTypes.CACHE_UPDATE, onCacheUpdate);
	yield takeEvery(cacheTypes.CACHE_RESET, onCacheReset);
}

function * onMenusSet() {
	const menus = yield select(menuSelectors.getMenus);

	return yield all([
		put({
			type: cacheTypes.CACHE_UPDATE,
			payload: {
				key: 'menus',
				data: menus.toJS()
			}
		})
	]);
}

function * onPagesSet() {
	const pages = yield select(pageSelectors.getPages);

	return yield all([
		put({
			type: cacheTypes.CACHE_UPDATE,
			payload: {
				key: 'pages',
				data: pages.toJS()
			}
		})
	]);
}

function * onPlatformsSet() {
	const platforms = yield select(platformSelectors.getPlatforms);

	return yield all([
		put({
			type: cacheTypes.CACHE_UPDATE,
			payload: {
				key: 'platforms',
				data: platforms.toJS()
			}
		})
	]);
}

function * onVideosSet() {
	const videos = yield select(videoSelectors.getVideos);

	return yield all([
		put({
			type: cacheTypes.CACHE_UPDATE,
			payload: {
				key: 'videos',
				data: videos.toJS()
			}
		})
	]);
}

function * onCacheUpdate({payload}) {
	return yield call(setData, payload);
}

function * onCacheReset() {
	return yield call(resetCache);
}
