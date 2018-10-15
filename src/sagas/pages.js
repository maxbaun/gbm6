import {takeEvery, all, put} from 'redux-saga/effects';

import {types as pageTypes} from '../ducks/pages';
import {types as cacheTypes} from '../ducks/cache';

export function * watchPages() {
	yield takeEvery(pageTypes.PAGES_GET, onPagesGet);
	yield takeEvery(pageTypes.PAGES_UPDATE, onPagesUpdate);
}

function * onPagesGet({payload}) {
	return yield payload;
}

function * onPagesUpdate() {
	return yield all([
		put({
			type: cacheTypes.CACHE_PAGES_SET
		})
	]);
}
