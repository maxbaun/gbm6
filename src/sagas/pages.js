import {takeEvery, all, put, select, call} from 'redux-saga/effects';

import {getPages} from '../services/api';
import {types as pageTypes, selectors as pageSelectors} from '../ducks/pages';
import {types as cacheTypes} from '../ducks/cache';
import {types as stateTypes} from '../ducks/state';
import {shouldCache, errors} from '../constants';

export function * watchPages() {
	yield takeEvery(pageTypes.PAGES_GET, onPagesGet);
	yield takeEvery(pageTypes.PAGES_UPDATE, onPagesUpdate);
}

function * onPagesGet({payload, fetch}) {
	const page = yield select(pageSelectors.getPage, payload.slug);

	if (page && shouldCache) {
		return;
	}

	const query = {
		'fields.slug': payload.slug
	};

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

	const res = yield call(getPages, {query});

	return yield all([
		put({
			type: pageTypes.PAGES_UPDATE,
			payload: res
		}),
		put({
			type: stateTypes.STATUS_CHANGE,
			fetch,
			payload: {
				loading: false,
				error: payload.slug && res.length === 0 ? errors.notFound : null
			}
		})
	]);
}

function * onPagesUpdate() {
	return yield all([
		put({
			type: cacheTypes.CACHE_PAGES_SET
		})
	]);
}
