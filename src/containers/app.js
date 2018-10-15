import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import {selectors as pageSelectors, actions as pageActions} from '../ducks/pages';
import {selectors as menuSelectors, actions as menuActions} from '../ducks/menus';
import {selectors as stateSelectors, actions as stateActions} from '../ducks/state';
import {noop} from '../utils/componentHelpers';

import Header from '../components/header/header';

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
		state: ImmutableProptypes.map.isRequired,
		history: PropTypes.object.isRequired
	};

	static defaultProps = {
		actions: {noop}
	};

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize);
		this.handleWindowResize();

		this.props.actions.menusGet({
			payload: {
				location: 'Top'
			}
		});
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
		return (
			<Fragment>
				<Header menus={this.props.menus} actions={this.props.actions} state={this.props.state} history={this.props.history}/>
				<div>this is the app component</div>
			</Fragment>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(App));
