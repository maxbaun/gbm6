import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {selectors as pageSelectors, actions as pageActions} from '../ducks/pages';
import {selectors as menuSelectors, actions as menuActions} from '../ducks/menus';

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
	componentDidMount() {
		this.props.actions.menusGet({
			payload: {
				location: 'Top'
			}
		});
	}

	render() {
		console.log(this.props.menus.toJS());
		return <div>this is the app component</div>;
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
