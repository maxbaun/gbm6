import {select, takeLatest, put, all} from 'redux-saga/effects';

import {types as stateTypes, selectors as stateSelectors} from '../ducks/state';
import {toDegrees} from '../utils/mathHelpers';
import {angleHeight} from '../constants';

export function * watchState() {
	yield takeLatest(stateTypes.OFFMENU_SHOW, onOffmenuChange);
	yield takeLatest(stateTypes.OFFMENU_TOGGLE, onOffmenuChange);
	yield takeLatest(stateTypes.OFFMENU_TOGGLE_WITH_DATA, onOffmenuToggleWithData);
	yield takeLatest(stateTypes.OFFMENU_HIDE, onOffmenuChange);
	yield takeLatest(stateTypes.OFFMENU_RESET, onOffmenuReset);
	yield takeLatest(stateTypes.WINDOW_RESIZE, onWindowResize);
}

export function * onOffmenuChange({name}) {
	const offmenuState = yield select(stateSelectors.getOffmenu, name);

	const action = offmenuState ? 'add' : 'remove';
	document.querySelector('body').classList[action]('offmenu-open');
}

export function * onOffmenuToggleWithData({payload}) {
	yield all([
		put({
			type: stateTypes.OFFMENU_DATA_SET,
			payload: {
				name: payload.name,
				data: payload.data
			}
		}),
		put({
			type: stateTypes.OFFMENU_TOGGLE,
			name: payload.name
		})
	]);
}

export function * onOffmenuReset() {
	return yield document.querySelector('body').classList.remove('offmenu-open');
}

export function * onWindowResize({payload}) {
	const windowWidth = payload.width;

	const halfWindow = windowWidth / 2;

	const height = (windowWidth / 100) * angleHeight;

	const angle = toDegrees(Math.atan(height / halfWindow));
	const fullAngle = toDegrees(Math.atan(height / windowWidth));

	yield all([
		put({
			type: stateTypes.ANGLE_SET,
			payload: angle
		}),
		put({
			type: stateTypes.FULL_ANGLE_SET,
			payload: fullAngle
		})
	]);

	return yield payload;
}
