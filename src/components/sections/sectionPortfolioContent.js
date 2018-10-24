import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import CSS from './sectionPortfolioContent.module.scss';
import HeadingBrand from '../headingBrand/headingBrand';

export default class SectionPortfolioContent extends Component {
	render() {
		return (
			<div data-section className={CSS.section}>
				<div className={CSS.wrap}>
					<div className={CSS.inner}>
						<div className={CSS.header}>
							<div className={CSS.heading}>
								<HeadingBrand heading="# SPRING WEEKEND FEATURING A BOOGIE & CHEAT CODES"/>
							</div>
							<div className={CSS.meta}>meta</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
