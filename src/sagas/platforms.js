import {takeEvery, all, put, select, call} from 'redux-saga/effects';

import {getPlatforms} from '../services/api';
import {types as platformTypes, selectors as platformSelectors} from '../ducks/platforms';
import {types as cacheTypes} from '../ducks/cache';
import {types as stateTypes} from '../ducks/state';
import {shouldCache, errors} from '../constants';

export function * watchPlatforms() {
	yield takeEvery(platformTypes.PLATFORMS_GET, onPlatformsGet);
	yield takeEvery(platformTypes.PLATFORMS_UPDATE, onPlatformsUpdate);
}

function * onPlatformsGet({fetch}) {
	const platforms = yield select(platformSelectors.getPlatforms);

	if (platforms && platforms.count() && shouldCache) {
		return;
	}

	yield all([
		put({
			type: stateTypes.STATUS_CHANGE,
			fetch,
			payload: {
				loading: true,
				error: null
			}
		})
	]);

	const res = yield call(getPlatforms);

	return yield all([
		put({
			type: platformTypes.PLATFORMS_UPDATE,
			payload: res
		}),
		put({
			type: stateTypes.STATUS_CHANGE,
			fetch,
			payload: {
				loading: false,
				error: res.length === 0 ? errors.notFound : null
			}
		})
	]);
}

function * onPlatformsUpdate() {
	return yield all([
		put({
			type: cacheTypes.CACHE_PLATFORMS_SET
		})
	]);
}
