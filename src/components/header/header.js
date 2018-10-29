import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Link} from 'react-router-dom';

import CSS from './header.module.scss';
import SearchTakeover from '../searchTakeover/searchTakeover';
import Hamburg from '../hamburg/hamburg';
import MegaMenu from '../menu/megaMenu';
import Logo from '../logo/logo';
import {click, chunkList} from '../../utils/componentHelpers';
import {currentMenu} from '../../utils/contentfulHelpers';
import {List, fromJS} from 'immutable';

export default class Header extends Component {
	constructor(props) {
		super(props);

		this.handleSearch = this.handleSearch.bind(this);
		this.handleOffmenuClose = this.handleOffmenuClose.bind(this);
		this.getTopLinks = this.getTopLinks.bind(this);
		this.getMegaMenuLinks = this.getMegaMenuLinks.bind(this);
	}

	static propTypes = {
		menus: ImmutablePropTypes.list.isRequired,
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		state: ImmutablePropTypes.map.isRequired,
		history: PropTypes.object.isRequired
	};

	componentDidMount() {
		this.props.actions.menusGet({payload: {location: 'top'}});
	}

	handleSearch(query) {
		this.props.actions.offmenuHide('search');
		this.props.history.push(`/search/${query}`);
	}

	handleOffmenuClose(offmenu) {
		if (this.props.state.getIn(['offmenu', offmenu])) {
			this.props.actions.offmenuHide(offmenu);
		}
	}

	currentMenu(location) {
		return currentMenu(this.props.menus, location);
	}

	splitMenuLinks(linkStr) {
		return linkStr.split('\n').map(linkStr => linkStr.split(':'));
	}

	getTopLinks() {
		const menu = this.currentMenu('Top');

		if (!menu || menu.isEmpty()) {
			return fromJS([]);
		}

		const linkStr = menu.getIn(['fields', 'links']);

		return fromJS(this.splitMenuLinks(linkStr));
	}

	getMegaMenuLinks() {
		const menu = this.currentMenu('Mega');

		const topLinks = this.getTopLinks();

		let mainLinks = List();

		if (menu && menu.getIn(['sys', 'id'])) {
			const linkStr = menu.getIn(['fields', 'links']);
			mainLinks = fromJS(this.splitMenuLinks(linkStr));
		}

		return fromJS([...mainLinks.map(link => ({link})), ...topLinks.map(link => ({link, className: 'mobileOnly'}))]);
	}

	render() {
		const megaMenuOpen = this.props.state.getIn(['offmenu', 'megaMenu']);

		return (
			<header className={CSS.header}>
				<div className={CSS.inner}>
					<div className={CSS.search}>
						<span className="fa fa-search" onClick={click(this.props.actions.offmenuToggle, 'search')}/>
						<SearchTakeover state={this.props.state} onSubmit={this.handleSearch} onOffmenuClose={this.handleOffmenuClose}/>
					</div>
					<div className={CSS.menuWrap}>
						<div className={CSS.menuLeft}>{this.renderTopLinks(0)}</div>
						<div className={CSS.logo}>
							<Link to="/" className={CSS.logoLink}>
								<Logo/>
							</Link>
						</div>
						<div className={CSS.menuRight}>{this.renderTopLinks(1)}</div>
					</div>
					<div className={CSS.hamburg}>
						<Hamburg active={megaMenuOpen} onClick={click(this.props.actions.offmenuToggle, 'megaMenu')}/>
					</div>
				</div>
				<MegaMenu links={this.getMegaMenuLinks()} active={megaMenuOpen} actions={this.props.actions}/>
			</header>
		);
	}

	renderTopLinks(index) {
		const topLinks = this.getTopLinks();

		const topChunks = chunkList(topLinks, 2);

		if (!topChunks.get(index)) {
			return null;
		}

		return (
			<ul className={CSS.navLinks}>
				{topChunks.get(index).map(link => {
					return (
						<li key={link.get(1)}>
							<Link to={link.get(0)} className={CSS.navLink}>
								{link.get(1)}
							</Link>
						</li>
					);
				})}
			</ul>
		);
	}
}
