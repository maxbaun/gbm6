import React, {cloneElement, createElement, Component} from 'react';
import {TransitionMotion, spring} from 'react-motion';
import PropTypes from 'prop-types';
import {noop} from '../../utils/componentHelpers';

function ensureSpring(styles) {
	return Object.keys(styles).reduce((acc, key) => {
		const value = styles[key];
		acc[key] = typeof value === 'number' ? spring(value) : value;
		return acc;
	}, {});
}

const identity = val => val;

class RouteTransition extends Component {
	static propTypes = {
		className: PropTypes.string,
		wrapperComponent: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.string]),
		atEnter: PropTypes.object.isRequired,
		atActive: PropTypes.object.isRequired,
		atLeave: PropTypes.object.isRequired,
		didLeave: PropTypes.func,
		mapStyles: PropTypes.func,
		runOnMount: PropTypes.bool,
		actions: PropTypes.object.isRequired,
		children: PropTypes.node.isRequired
	};

	static defaultProps = {
		className: null,
		wrapperComponent: 'div',
		runOnMount: false,
		mapStyles: identity,
		didLeave: noop
	};

	getDefaultStyles() {
		if (!this.props.runOnMount) {
			return null;
		}

		if (!this.props.children) {
			return [];
		}

		return [
			{
				key: this.props.children.key,
				data: this.props.children,
				style: this.props.atEnter
			}
		];
	}

	// There's only ever one route mounted at a time,
	// so just return the current match
	getStyles() {
		if (!this.props.children) {
			return [];
		}

		return [
			{
				key: this.props.children.key,
				data: this.props.children,
				style: ensureSpring(this.props.atActive)
			}
		];
	}

	willEnter = () => {
		this.props.actions.pageTransitionStart();
		return this.props.atEnter;
	};

	willLeave = () => {
		return ensureSpring(this.props.atLeave);
	};

	didLeave = styleThatLeft => {
		this.props.actions.pageTransitionEnd();
		if (this.props.didLeave) {
			this.props.didLeave(styleThatLeft);
		}
	};

	renderRoute = config => {
		const props = {
			style: this.props.mapStyles(config.style),
			key: config.key,
			className: 'page-transition'
		};

		return this.props.wrapperComponent ? createElement(this.props.wrapperComponent, props, config.data) : cloneElement(config.data, props);
	};

	renderRoutes = interpolatedStyles => {
		return <div className={this.props.className}>{interpolatedStyles.map(this.renderRoute)}</div>;
	};

	render() {
		return (
			<TransitionMotion
				defaultStyles={this.getDefaultStyles()}
				styles={this.getStyles()}
				willEnter={this.willEnter}
				willLeave={this.willLeave}
				didLeave={this.didLeave}
			>
				{this.renderRoutes}
			</TransitionMotion>
		);
	}
}

export default RouteTransition;
