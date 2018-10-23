import {takeEvery, all, call, put, select} from 'redux-saga/effects';

import {getMenus} from '../services/api';
import {types as menuTypes, selectors as menuSelectors} from '../ducks/menus';
import {types as cacheTypes} from '../ducks/cache';
import {shouldCache} from '../constants';

export function * watchMenus() {
	yield takeEvery(menuTypes.MENUS_GET, onMenusGet);
	yield takeEvery(menuTypes.MENUS_UPDATE, onMenusUpdate);
}

function * onMenusGet({payload}) {
	const menu = yield select(menuSelectors.getMenu, payload.location);

	if (menu && shouldCache) {
		return;
	}

	const query = {
		'fields.location[eq]': payload.location
	};

	const res = yield call(getMenus, {query});

	return yield all([
		put({
			type: menuTypes.MENUS_UPDATE,
			payload: res
		})
	]);
}

function * onMenusUpdate() {
	return yield all([
		put({
			type: cacheTypes.CACHE_MENUS_SET
		})
	]);
}
