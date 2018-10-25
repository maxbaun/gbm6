import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import {List} from 'immutable';

import {selectors as pageSelectors, actions as pageActions} from '../ducks/pages';
import {selectors as menuSelectors, actions as menuActions} from '../ducks/menus';
import {selectors as stateSelectors, actions as stateActions} from '../ducks/state';
import {selectors as videoSelectors, actions as videoActions} from '../ducks/videos';
import {noop, vimeoId} from '../utils/componentHelpers';
import {portfolioBase} from '../constants';

import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import PageTemplate from '../templates/page';
import PortfolioTemplate from '../templates/portfolio';
import WatchThis from '../components/page/watchThis';
import Concerts from '../components/page/concerts';
import ProjectsPage from '../components/page/projects';
import VideoModal from '../components/modals/videoModal';
import {toDegrees} from '../utils/mathHelpers';

const mapStateToProps = state => ({
	pages: pageSelectors.getPages(state),
	menus: menuSelectors.getMenus(state),
	state: stateSelectors.getState(state),
	videos: videoSelectors.getVideos(state),
	errors: stateSelectors.getErrors(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		{
			...pageActions,
			...menuActions,
			...stateActions,
			...videoActions
		},
		dispatch
	)
});

class App extends Component {
	static propTypes = {
		menus: ImmutableProptypes.list.isRequired,
		actions: PropTypes.objectOf(PropTypes.func),
		state: ImmutableProptypes.map.isRequired,
		videos: ImmutableProptypes.list,
		errors: ImmutableProptypes.list
	};

	static defaultProps = {
		actions: {noop},
		videos: List(),
		errors: List()
	};

	componentDidMount() {
		this.setAngle();

		this.props.actions.videosInit({});
	}

	setAngle() {
		const windowWidth = window.innerWidth;
		const halfWindow = windowWidth / 2;

		const height = (windowWidth / 100) * 18;

		const angle = toDegrees(Math.atan(height / halfWindow));

		this.props.actions.angleSet(angle);
	}

	render() {
		const {state, menus, actions} = this.props;
		const props = {state, menus, actions};

		return (
			<Fragment>
				<Header menus={this.props.menus} actions={this.props.actions} state={this.props.state} history={this.props.history}/>
				<Switch>
					<Route exact path="/watch-this" render={p => <WatchThis {...props} {...p}/>}/>
					<Route exact path="/concerts" render={p => <Concerts {...props} {...p}/>}/>
					<Route exact path={`/${portfolioBase}/:slug`} component={PortfolioTemplate}/>
					<Route exact path="/:slug" component={PageTemplate}/>
					<Route path="*" component={PageTemplate}/>
				</Switch>
				{this.props.state.get('videoModals').map(video => {
					return <VideoModal key={video} url={video} state={state} actions={actions}/>;
				})}
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
