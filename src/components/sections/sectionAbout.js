import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';

import CSS from './sectionAbout.module.scss';
import Markdown from '../common/markdown';
import HeadingBrand from '../headingBrand/headingBrand';

const SectionAbout = ({heading, text, backgroundImage, icons, id, counters}) => {
	icons = icons.split('\n');
	counters = counters.split('\n');

	return (
		<div data-section id={id} className={CSS.section}>
			<div className={CSS.background}>
				<img src={backgroundImage.get('src')}/>
			</div>
			<div className={CSS.inner}>
				<div className={CSS.content}>
					<div className={CSS.row}>
						<div className={CSS.col}>
							<div className={CSS.heading}>
								<HeadingBrand heading={heading}/>
							</div>
						</div>
						<div className={CSS.col}>
							<div className={CSS.text}>
								<Markdown content={text}/>
							</div>
						</div>
					</div>
				</div>
				{icons && icons.length ? (
					<ul className={CSS.iconBlocks}>
						{icons &&
							icons.map(icon => {
								const parts = icon.split(':');

								return (
									<li key={icon} className={CSS.iconBlock}>
										<div className={CSS.icon}>
											<span className={parts[0]}/>
											<p>{parts[1]}</p>
										</div>
									</li>
								);
							})}
					</ul>
				) : null}
				{counters && counters.length ? (
					<div className={CSS.counters}>
						<ul className={CSS.counterBlocks}>
							{counters.map(counter => {
								const parts = counter.split(':');

								return (
									<li key={parts[0] + parts[2]} className={CSS.counterBlock}>
										<div className={CSS.counter}>
											<h3>
												{parts[0]}
												{parts[1]}
											</h3>
											<p>{parts[2]}</p>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				) : null}
			</div>
		</div>
	);
};

SectionAbout.propTypes = {
	heading: PropTypes.string,
	text: PropTypes.string,
	backgroundImage: ImmutablePropTypes.map,
	icons: PropTypes.string,
	state: ImmutablePropTypes.map.isRequired,
	id: PropTypes.string.isRequired,
	counters: PropTypes.string
};

SectionAbout.defaultProps = {
	heading: '',
	text: '',
	backgroundImage: Map(),
	icons: '',
	counters: ''
};

export default SectionAbout;
