import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import {spring} from 'react-motion';

import {actions as stateActions} from '../ducks/state';
import {actions as videoActions} from '../ducks/videos';
import {actions as platformActions} from '../ducks/platforms';
import {noop, unique} from '../utils/componentHelpers';
import {portfolioBase} from '../constants';

import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import PageTemplate from '../templates/page';
import PortfolioTemplate from '../templates/portfolio';
import ResetTemplate from '../templates/reset';
import SearchTemplate from '../templates/search';
import AnimatedSwitch from '../components/routing/animatedSwitch';
import VideoModals from '../components/modals/videoModals';
import Lightboxes from '../components/modals/lightboxes';
import HashScroller from '../components/common/hashScroller';

const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		{
			...stateActions,
			...videoActions,
			...platformActions
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
	constructor(props) {
		super(props);

		this.fetch = unique();

		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	};

	static defaultProps = {
		actions: {noop}
	};

	componentDidMount() {
		this.props.actions.videosInit({});
		this.props.actions.platformsGet({fetch: this.fetch});

		window.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown(e) {
		// Shift + Meta + F
		if (e.metaKey && e.shiftKey && e.keyCode === 70) {
			this.props.actions.offmenuToggle('search');
			e.preventDefault();
		}
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
				<Lightboxes/>
				<Footer/>
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
