import {takeEvery, all, call, put, select} from 'redux-saga/effects';
import {Map, fromJS} from 'immutable';

import {types as cacheTypes} from '../ducks/cache';
import {selectors as menuSelectors} from '../ducks/menus';
import {selectors as pageSelectors} from '../ducks/pages';
import {setData} from '../services/cache';

export function * watchCache() {
	yield takeEvery(cacheTypes.CACHE_MENUS_SET, onMenusSet);
	yield takeEvery(cacheTypes.CACHE_PAGES_SET, onPagesSet);
	yield takeEvery(cacheTypes.CACHE_UPDATE, onCacheUpdate);
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

function * onCacheUpdate({payload}) {
	return yield call(setData, payload);
}
