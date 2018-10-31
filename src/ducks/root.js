import {combineReducers} from 'redux-immutable';

import pages from './pages';
import menus from './menus';
import state from './state';
import videos from './videos';
import search from './search';
import platforms from './platforms';

export const reducers = {
	pages,
	menus,
	state,
	videos,
	search,
	platforms
};

const Ducks = combineReducers(reducers);

export default Ducks;
