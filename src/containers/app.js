import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';

import {selectors as pageSelectors, actions as pageActions} from '../ducks/pages';
import {selectors as menuSelectors, actions as menuActions} from '../ducks/menus';
import {selectors as stateSelectors, actions as stateActions} from '../ducks/state';
import {noop} from '../utils/componentHelpers';

import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Page from '../components/page/page';
import WatchThis from '../components/page/watchThis';
import Concerts from '../components/page/concerts';

const mapStateToProps = state => ({
	pages: pageSelectors.getPages(state),
	menus: menuSelectors.getMenus(state),
	state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		{
			...pageActions,
			...menuActions,
			...stateActions
		},
		dispatch
	)
});

class App extends Component {
	constructor(props) {
		super(props);

		this.handleWindowResize = this.handleWindowResize.bind(this);
	}

	static propTypes = {
		menus: ImmutableProptypes.list.isRequired,
		actions: PropTypes.objectOf(PropTypes.func),
		state: ImmutableProptypes.map.isRequired
	};

	static defaultProps = {
		actions: {noop}
	};

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize);
		this.handleWindowResize();

		// This.props.actions.menusGet({
		// 	payload: {
		// 		location: 'Top'
		// 	}
		// });
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	}

	handleWindowResize() {
		this.props.actions.windowResize({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}

	render() {
		const {state, menus, actions} = this.props;
		const props = {state, menus, actions};

		return (
			<Fragment>
				<Header menus={this.props.menus} actions={this.props.actions} state={this.props.state} history={this.props.history}/>
				<Switch>
					<Route path="/watch-this" render={p => <WatchThis {...props} {...p}/>}/>
					<Route path="/concerts" render={p => <Concerts {...props} {...p}/>}/>
					<Route path="/:slug" render={p => <Page {...props} {...p}/>}/>
					<Route path="*" render={p => <Page {...props} {...p}/>}/>
				</Switch>
				<Footer copyright="Copyright 2018 GMB6 &nbsp&nbsp&nbsp&nbsp | &nbsp&nbsp&nbsp&nbsp All Rights Reserved."/>
			</Fragment>
		);
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
