import {fork, all} from 'redux-saga/effects';

import {watchPages} from './pages';
import {watchMenus} from './menus';
import {watchCache} from './cache';
import {watchState} from './state';
import {watchVideos} from './videos';
import {watchForms} from './forms';
import {watchSearch} from './search';
import {watchPlatforms} from './platforms';

export default function * Sagas() {
	yield all([
		fork(watchPages),
		fork(watchMenus),
		fork(watchCache),
		fork(watchState),
		fork(watchVideos),
		fork(watchForms),
		fork(watchSearch),
		fork(watchPlatforms)
	]);
}
