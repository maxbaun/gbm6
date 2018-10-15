import {combineReducers} from 'redux-immutable';

import pages from './pages';
import menus from './menus';

export const reducers = {
	pages,
	menus
};

const Ducks = combineReducers(reducers);

export default Ducks;
