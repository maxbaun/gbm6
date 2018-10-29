import {combineReducers} from 'redux-immutable';

import pages from './pages';
import menus from './menus';
import state from './state';
import videos from './videos';
import search from './search';

export const reducers = {
	pages,
	menus,
	state,
	videos,
	search
};

const Ducks = combineReducers(reducers);

export default Ducks;
