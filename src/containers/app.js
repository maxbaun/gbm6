import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import {selectors as pageSelectors, actions as pageActions} from '../ducks/pages';
import {selectors as menuSelectors, actions as menuActions} from '../ducks/menus';
import {noop} from '../utils/componentHelpers';

import Header from '../components/header/header';

const mapStateToProps = state => ({
	pages: pageSelectors.getPages(state),
	menus: menuSelectors.getMenus(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		{
			...pageActions,
			...menuActions
		},
		dispatch
	)
});

class App extends Component {
	static propTypes = {
		menus: ImmutableProptypes.list.isRequired,
		actions: PropTypes.objectOf(PropTypes.func)
	};

	static defaultProps = {
		actions: {noop}
	};

	componentDidMount() {
		this.props.actions.menusGet({
			payload: {
				location: 'Top'
			}
		});
	}

	render() {
		return (
			<Fragment>
				<Header menus={this.props.menus}/>
				<div>this is the app component</div>
			</Fragment>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
