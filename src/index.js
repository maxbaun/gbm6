import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {BrowserRouter} from 'react-router-dom';

import qhistory from 'qhistory';
import {parse, stringify} from 'qs';

import {analytics} from './utils/trackingHelpers';
import * as serviceWorker from './services/serviceWorker';
import store from './store';
import App from './containers/app';
import {googleAnalytics} from './constants';

import './css/index.scss';

const history = qhistory(createHistory(), stringify, parse);

const s = store(history);

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

ReactDOM.render(<Index/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
