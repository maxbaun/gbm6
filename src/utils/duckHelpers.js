import {fromJS} from 'immutable';

export function initialState(data) {
	return fromJS(data);
}

export function action(type, payload = {}) {
	return {type, ...payload};
}

export function requestTypes(base) {
	const REQUEST = 'REQUEST';
	const GET = 'GET';
	const SAVE = 'SAVE';
	const CREATE = 'CREATE';
	const UPDATE = 'UPDATE';
	const DELETE = 'DELETE';
	const RESPONSE = 'RESPONSE';
	const SUCCESS = 'SUCCESS';
	const FAILURE = 'FAILURE';

	return [GET, SAVE, CREATE, UPDATE, DELETE, RESPONSE, REQUEST, SUCCESS, FAILURE].reduce((action, type) => {
		const baseType = `${base}_${type}`;

		action[baseType] = baseType;

		return action;
	}, {});
}

export function updateList(root, payload) {
	return root.update(updated => {
		const newData = fromJS(payload);

		newData.forEach(item => {
			const existingItem = updated.find(i => i.getIn(['sys', 'id']) === item.getIn(['sys', 'id']));
			const existingIndex = updated.indexOf(existingItem);

			if (existingIndex > -1) {
				updated = updated.set(existingIndex, item);
			} else {
				updated = updated.push(item);
			}
		});

		return updated;
	});
}
