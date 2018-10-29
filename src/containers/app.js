import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import {List} from 'immutable';
import {spring} from 'react-motion';

import {selectors as pageSelectors, actions as pageActions} from '../ducks/pages';
import {selectors as menuSelectors, actions as menuActions} from '../ducks/menus';
import {selectors as stateSelectors, actions as stateActions} from '../ducks/state';
import {selectors as videoSelectors, actions as videoActions} from '../ducks/videos';
import {noop, debounce} from '../utils/componentHelpers';
import {portfolioBase, angleHeight} from '../constants';

import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import PageTemplate from '../templates/page';
import PortfolioTemplate from '../templates/portfolio';
import AnimatedSwitch from '../components/routing/animatedSwitch';
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

function fadeIn(val) {
	return spring(val, {
		stiffness: 75,
		damping: 40
	});
}

function fadeOut(val) {
	return spring(val, {
		stiffness: 75,
		damping: 16
	});
}

const pageTransitions = {
	atEnter: {
		opacity: 0,
		absolute: 1
	},
	atLeave: {
		opacity: fadeOut(0),
		absolute: 1
	},
	atActive: {
		opacity: fadeIn(1),
		absolute: 0
	}
};

class App extends Component {
	constructor(props) {
		super(props);

		this.handleResize = debounce(this.handleResize.bind(this), 150);
	}

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
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
		this.setAngle();

		this.props.actions.videosInit({});
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	handleResize() {
		this.props.actions.windowResize({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}

	setAngle() {
		const windowWidth = window.innerWidth;
		const halfWindow = windowWidth / 2;

		const height = (windowWidth / 100) * angleHeight;

		const angle = toDegrees(Math.atan(height / halfWindow));
		const fullAngle = toDegrees(Math.atan(height / windowWidth));

		this.props.actions.angleSet(angle);
		this.props.actions.fullAngleSet(fullAngle);
	}

	render() {
		const {state, menus, actions, history} = this.props;

		return (
			<Fragment>
				<Header menus={menus} actions={actions} state={state} history={history}/>
				<AnimatedSwitch
					{...pageTransitions}
					runOnMount
					actions={actions}
					mapStyles={styles => ({
						opacity: styles.opacity,
						position: styles.absolute ? 'absolute' : 'relative',
						left: styles.absolute ? 0 : 'auto',
						right: styles.absolute ? 0 : 'auto',
						top: styles.absolute ? 0 : 'auto',
						bottom: styles.absolute ? 0 : 'auto'
					})}
				>
					<Route exact path={`/${portfolioBase}/:slug`} component={PortfolioTemplate}/>
					<Route exact path="/:slug" component={PageTemplate}/>
					<Route path="/" render={PageTemplate}/>
				</AnimatedSwitch>
				{this.props.state.get('videoModals').map(video => {
					return <VideoModal key={video} url={video} state={state} actions={actions}/>;
				})}
				<Footer copyright="Copyright 2018 GMB6 &nbsp&nbsp&nbsp&nbsp | &nbsp&nbsp&nbsp&nbsp All Rights Reserved." state={state}/>
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
