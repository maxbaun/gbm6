import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Link, Redirect} from 'react-router-dom';

import CSS from './header.module.scss';
import SearchTakeover from '../searchTakeover/searchTakeover';
import Hamburg from '../hamburg/hamburg';
import MegaMenu from '../menu/megaMenu';
import Logo from '../logo/logo';
import {click} from '../../utils/componentHelpers';
import {responsive} from '../../constants';

export default class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: null
		};

		this.handleSearch = this.handleSearch.bind(this);
		this.handleOffmenuClose = this.handleOffmenuClose.bind(this);
		this.getLogoSize = this.getLogoSize.bind(this);
	}

	static propTypes = {
		menus: ImmutablePropTypes.list.isRequired,
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		state: ImmutablePropTypes.map.isRequired
	};

	handleSearch(query) {
		this.props.actions.offmenuHide('search');
		this.setState({search: query});
	}

	handleOffmenuClose(offmenu) {
		if (this.props.state.getIn(['offmenu', offmenu])) {
			this.props.actions.offmenuHide(offmenu);
		}
	}

	getLogoSize() {
		const windowWidth = this.props.state.getIn(['windowSize', 'width']);

		if (windowWidth >= responsive.desktop) {
			return {
				width: 164,
				height: 70
			};
		}

		if (windowWidth >= responsive.collapse) {
			return {
				width: 154,
				height: 60
			};
		}

		return {
			width: 77,
			height: 33
		};
	}

	render() {
		const megaMenuOpen = this.props.state.getIn(['offmenu', 'megaMenu']);
		const logoSize = this.getLogoSize();

		if (this.state.search) {
			return <Redirect to={`/search/${this.state.search}`}/>;
		}

		return (
			<header className={CSS.header}>
				<div className={CSS.inner}>
					<div className={CSS.search}>
						<span className="fa fa-search" onClick={click(this.props.actions.offmenuToggle, 'search')}/>
						<SearchTakeover state={this.props.state} onSubmit={this.handleSearch} onOffmenuClose={this.handleOffmenuClose}/>
					</div>
					<div className={CSS.menuWrap}>
						<div className={CSS.menuLeft}>
							<ul className={CSS.navLinks}>
								<li>
									<Link to="/" className={CSS.navLink}>
										Concerts
									</Link>
								</li>
								<li>
									<Link to="/" className={CSS.navLink}>
										Special Projects
									</Link>
								</li>
							</ul>
						</div>
						<div className={CSS.logo} style={{...logoSize}}>
							<Link to="/" className={CSS.logoLink}>
								<Logo width={logoSize.width} height={logoSize.height}/>
							</Link>
						</div>
						<div className={CSS.menuRight}>
							<ul className={CSS.navLinks}>
								<li>
									<Link to="/" className={CSS.navLink}>
										Behind The Scenes
									</Link>
								</li>
								<li>
									<Link to="/" className={CSS.navLink}>
										Watch This
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className={CSS.hamburg}>
						<Hamburg active={megaMenuOpen} onClick={click(this.props.actions.offmenuToggle, 'megaMenu')}/>
					</div>
				</div>
				<MegaMenu active={megaMenuOpen} actions={this.props.actions}/>
			</header>
		);
	}
}
