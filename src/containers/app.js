import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import {spring} from 'react-motion';

import {actions as stateActions} from '../ducks/state';
import {actions as videoActions} from '../ducks/videos';
import {noop} from '../utils/componentHelpers';
import {portfolioBase, angleHeight} from '../constants';

import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import PageTemplate from '../templates/page';
import PortfolioTemplate from '../templates/portfolio';
import ResetTemplate from '../templates/reset';
import SearchTemplate from '../templates/search';
import AnimatedSwitch from '../components/routing/animatedSwitch';
import VideoModals from '../components/modals/videoModals';
import HashScroller from '../components/common/hashScroller';
import {toDegrees} from '../utils/mathHelpers';

const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		{
			...stateActions,
			...videoActions
		},
		dispatch
	)
});

function fadeIn(val) {
	return spring(val, {
		stiffness: 75,
		damping: 20
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
	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	};

	static defaultProps = {
		actions: {noop}
	};

	componentDidMount() {
		this.setAngle();

		this.props.actions.videosInit({});
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
		const {actions, history, location} = this.props;

		return (
			<Fragment>
				<Header history={history}/>
				<HashScroller location={location}>
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
						<Route exact path="/reset" component={ResetTemplate}/>
						<Route exact path="/search/:search" component={SearchTemplate}/>
						<Route exact path={`/${portfolioBase}/:slug`} component={PortfolioTemplate}/>
						<Route exact path="/:slug" component={PageTemplate}/>
						<Route path="/" render={PageTemplate}/>
					</AnimatedSwitch>
				</HashScroller>
				<VideoModals/>
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
