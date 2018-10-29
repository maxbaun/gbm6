import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';

export const types = {
	FORM_CREATE: 'FORM_CREATE'
};

export const actions = {
	formCreate: obj => utils.action(types.FORM_CREATE, obj)
};

const initialState = utils.initialState({
	contact: {}
});

export default (state = initialState, action) => {
	switch (action.type) {
		case types.FORM_CREATE:
			return state.setIn([action.payload.key], action.payload.data);

		default:
			return state;
	}
};

const getForms = state => state.get('forms');

export const selectors = {
	getForms: createSelector([getForms], forms => forms)
};
