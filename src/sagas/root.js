import {fork, all} from 'redux-saga/effects';

import {watchPages} from './pages';
import {watchMenus} from './menus';
import {watchCache} from './cache';
import {watchState} from './state';

export default function * Sagas() {
	yield all([fork(watchPages), fork(watchMenus), fork(watchCache), fork(watchState)]);
}
