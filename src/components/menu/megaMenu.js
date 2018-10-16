import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';

import CSS from './megaMenu.module.scss';
import Offmenu from '../offmenu/offmenu';
import {click} from '../../utils/componentHelpers';

export default class MegaMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	static propTypes = {
		active: PropTypes.bool,
		actions: PropTypes.objectOf(PropTypes.func).isRequired
	};

	static defaultProps = {
		active: false
	};

	render() {
		return (
			<Offmenu theme="megaMenu" active={this.props.active} position="right" onToggle={click(this.props.actions.offmenuToggle, 'megaMenu')}>
				<div className={CSS.menu}>
					<h1>mega menu</h1>
					<h1>mega menu</h1>
					<h1>mega menu</h1>
					<h1>mega menu</h1>
					<h1>mega menu</h1>
				</div>
			</Offmenu>
		);
	}
}
