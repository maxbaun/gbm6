import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import CSS from './sectionManager.module.scss';
import {ref} from '../../utils/componentHelpers';

export default class SectionManager extends Component {
	constructor(props) {
		super(props);

		this.wrap = null;
	}

	static propTypes = {
		children: PropTypes.arrayOf(PropTypes.node).isRequired,
		template: PropTypes.string.isRequired,
		hasCta: PropTypes.bool.isRequired
	};

	render() {
		const {children, template} = this.props;

		const c = children[0].length ? children[0] : children;

		return (
			<Fragment>
				<div
					ref={ref.call(this, 'wrap')}
					className={CSS.sectionManager}
					data-template={template}
					data-odd={c.length % 2 === 1}
					data-even={c.length % 2 === 0}
				>
					{children}
				</div>
			</Fragment>
		);
	}
}
