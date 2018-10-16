import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {Link} from 'react-router-dom';

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
					<ul className={CSS.links}>
						<li>
							<Link to="/" className={CSS.link}>
								Home
							</Link>
						</li>
						<li>
							<Link to="/" className={CSS.link}>
								About Us
							</Link>
						</li>
						<li>
							<Link to="/" className={CSS.link}>
								Our Team
							</Link>
						</li>
						<li>
							<Link to="/" className={CSS.link}>
								Videos
							</Link>
						</li>
						<li>
							<Link to="/" className={CSS.link}>
								Testimonials
							</Link>
						</li>
						<li>
							<Link to="/" className={CSS.link}>
								FAQ
							</Link>
						</li>
						<li>
							<Link to="/" className={CSS.link}>
								Contact
							</Link>
						</li>
					</ul>
				</div>
			</Offmenu>
		);
	}
}
