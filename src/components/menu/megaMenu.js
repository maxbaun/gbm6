import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {Link} from 'react-router-dom';
import {List} from 'immutable';

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
		links: ImmutableProptypes.list,
		actions: PropTypes.objectOf(PropTypes.func).isRequired
	};

	static defaultProps = {
		active: false,
		links: List()
	};

	render() {
		return (
			<Offmenu theme="megaMenu" active={this.props.active} position="right" onToggle={click(this.props.actions.offmenuToggle, 'megaMenu')}>
				<div className={CSS.menu}>
					<ul className={CSS.links}>
						{this.props.links.map(link => {
							const linkParts = link.get('link');
							const linkClass = link.get('className');

							const linkCss = [CSS.link];

							if (linkClass && CSS[linkClass]) {
								linkCss.push(CSS[linkClass]);
							}

							return (
								<li key={link.get('key')}>
									<Link
										to={linkParts.get(0)}
										className={linkCss.join(' ')}
										onClick={click(this.props.actions.offmenuToggle, 'megaMenu')}
									>
										{linkParts.get(1)}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</Offmenu>
		);
	}
}
