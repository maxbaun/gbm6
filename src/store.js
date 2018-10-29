import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Map} from 'immutable';

import Ducks from './ducks/root';
import Sagas from './sagas/root';

const store = () => {
	const initialState = Map();
	const sagaMiddleware = createSagaMiddleware();

	const middlewares = [sagaMiddleware];

	let composeEnhancers = compose;

	if (
		process.env.NODE_ENV === 'production' && // eslint-disable-line
		window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
		Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length
	) {
		window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {};
	}

	if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
		// eslint-disable-line
		// middlewares.push(createLogger());
		composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	}

	const DataStore = createStore(Ducks, initialState, composeEnhancers(applyMiddleware(...middlewares)));

	sagaMiddleware.run(Sagas);

	return DataStore;
};

export default store;
