import {combineReducers} from 'redux-immutable';

import pages from './pages';
import menus from './menus';
import state from './state';

export const reducers = {
	pages,
	menus,
	state
};

const Ducks = combineReducers(reducers);

export default Ducks;
