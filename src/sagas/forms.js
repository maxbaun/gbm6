import {takeEvery, all, call, put} from 'redux-saga/effects';
import axios from 'axios';

import {types as formTypes} from '../ducks/forms';
import {types as stateTypes} from '../ducks/state';

export function * watchForms() {
	yield takeEvery(formTypes.FORM_CREATE, onFormCreate);
}

function * onFormCreate(action) {
	const {fetch, payload} = action;

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

	try {
		const res = yield call(submitForm, payload);

		yield all([
			put({
				type: stateTypes.STATUS_CHANGE,
				fetch,
				payload: {
					loading: false,
					success: payload.success
				}
			})
		]);

		return yield res;
	} catch (error) {
		yield all([
			put({
				type: stateTypes.STATUS_CHANGE,
				fetch,
				payload: {
					loading: false,
					error: error.message
				}
			})
		]);
	}

	return yield action;
}

function submitForm(payload) {
	return axios({
		url: '/',
		method: 'POST',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data: encode({'form-name': payload.formName, ...payload.data})
	});
}

const encode = data => {
	return Object.keys(data)
		.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
		.join('&');
};
