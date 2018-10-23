import {combineReducers} from 'redux-immutable';

import pages from './pages';
import menus from './menus';
import state from './state';
import videos from './videos';

export const reducers = {
	pages,
	menus,
	state,
	videos
};

const Ducks = combineReducers(reducers);

export default Ducks;
