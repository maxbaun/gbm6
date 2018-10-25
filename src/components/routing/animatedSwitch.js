import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import RouteTransition from './routeTransition';

class AnimatedSwitch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			key: props.location.key
		};
	}

	static propTypes = {
		location: PropTypes.shape({
			key: PropTypes.string,
			pathname: PropTypes.string
		}).isRequired,
		actions: PropTypes.object.isRequired
	};

	static getDerivedStateFromProps(props, state) {
		const nextKey = props.location.pathname;

		if (nextKey === state.key) {
			return state;
		}

		return {
			key: nextKey
		};
	}

	render() {
		const {children, location, match, ...routeTransitionProps} = this.props;

		return (
			<RouteTransition {...routeTransitionProps}>
				<Switch key={this.state.key} location={location}>
					{children}
				</Switch>
			</RouteTransition>
		);
	}
}

// Inject location as a prop so we can listen for changes
const RouteWrapper = props => <Route render={({location}) => <AnimatedSwitch location={location} {...props}/>}/>;

export default RouteWrapper;
