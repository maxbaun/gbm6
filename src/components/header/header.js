import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

export default class Header extends Component {
	static propTypes = {
		menus: ImmutablePropTypes.list.isRequired
	};

	render() {
		return <header>header</header>;
	}
}
