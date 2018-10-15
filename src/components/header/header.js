import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import CSS from './header.module.scss';
import SearchTakeover from '../searchTakeover/searchTakeover';
import {click} from '../../utils/componentHelpers';

export default class Header extends Component {
	constructor(props) {
		super(props);

		this.handleSearch = this.handleSearch.bind(this);
		this.handleOffmenuClose = this.handleOffmenuClose.bind(this);
	}

	static propTypes = {
		menus: ImmutablePropTypes.list.isRequired,
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		state: ImmutablePropTypes.map.isRequired,
		history: PropTypes.object.isRequired
	};

	handleSearch(query) {
		this.props.history.push(`/search/${query}`);
	}

	handleOffmenuClose(offmenu) {
		if (this.props.state.getIn(['offmenu', offmenu])) {
			this.props.actions.offmenuHide(offmenu);
		}
	}

	render() {
		return (
			<header className={CSS.header}>
				<div className={CSS.inner}>
					<div className={CSS.search}>
						<span className="fa fa-search" onClick={click(this.props.actions.offmenuToggle, 'search')}/>
						<SearchTakeover state={this.props.state} onSubmit={this.handleSearch} onOffmenuClose={this.handleOffmenuClose}/>
					</div>
					<div className={CSS.menuWrap}>
						<div className={CSS.menuLeft}>menuLeft</div>
						<div className={CSS.logo}>logo</div>
						<div className={CSS.menuRight}>menuRight</div>
					</div>
					<div className={CSS.hamburg}>hamburg</div>
				</div>
			</header>
		);
	}
}
