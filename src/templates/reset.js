import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {actions as cacheActions} from '../ducks/cache';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		{
			...cacheActions
		},
		dispatch
	)
});

class ResetTemplate extends Component {
	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		history: PropTypes.object.isRequired
	};

	componentDidMount() {
		this.props.actions.cacheReset();
		this.props.history.push('/');
	}

	render() {
		return null;
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ResetTemplate);
