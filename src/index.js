import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {BrowserRouter} from 'react-router-dom';
import {registerObserver} from 'react-perf-devtool';
import qhistory from 'qhistory';
import {parse, stringify} from 'qs';
import {debounce} from 'lodash';

import {analytics} from './utils/trackingHelpers';
import * as serviceWorker from './services/serviceWorker';
import store from './store';
import App from './containers/app';
import {googleAnalytics} from './constants';
import {types as stateTypes} from './ducks/state';

import './css/index.scss';

const isDev = process.env.NODE_ENV !== 'production';

const history = qhistory(createHistory(), stringify, parse);

const s = store(history);

const windowResize = () => ({
	type: stateTypes.WINDOW_RESIZE,
	payload: {
		width: document.body.clientWidth,
		height: document.body.clientHeight
	}
});

let handleResize = () => s.dispatch(windowResize());
handleResize = debounce(handleResize, 140);

window.addEventListener('resize', handleResize);

s.dispatch(windowResize());

class Index extends React.Component {
	render() {
		return (
			<Provider store={s}>
				<BrowserRouter>
					<App/>
				</BrowserRouter>
			</Provider>
		);
	}
}

// Initialize Google Analytics
analytics('initialize', googleAnalytics);

if (isDev) {
	registerObserver();
}

ReactDOM.render(<Index/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
