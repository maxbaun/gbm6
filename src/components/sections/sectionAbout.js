import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';

import CSS from './sectionAbout.module.scss';
import Markdown from '../common/markdown';
import Image from '../common/image';
import HeadingBrand from '../headingBrand/headingBrand';
import SectionLines from '../common/sectionLines';

const SectionAbout = ({heading, text, image, imageCss, icons, id, counters, state}) => {
	icons = icons.split('\n');
	counters = counters.split('\n');

	return (
		<div data-section id={id} className={CSS.section}>
			<div data-clip-target>
				<SectionLines state={state}/>
				<Image background className={CSS.background} style={imageCss} image={image}/>
				<div className={CSS.overlay}/>
				<div className={CSS.inner}>
					<div className="container">
						<div className="row align-items-md-center">
							<div className="col-xs-10 col-md-6 offset-xs-1">
								<div className={CSS.heading}>
									<HeadingBrand heading={heading} headingClass={CSS.aboutHeading}/>
								</div>
							</div>
							<div className="col-xs-10 col-md-6 offset-xs-1">
								<div className={CSS.text}>
									<Markdown content={text}/>
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
						{counters && counters.length && counters[0] !== '' ? (
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
			</div>
		</div>
	);
};

SectionAbout.propTypes = {
	heading: PropTypes.string,
	text: PropTypes.string,
	image: ImmutablePropTypes.map,
	icons: PropTypes.string,
	state: ImmutablePropTypes.map.isRequired,
	id: PropTypes.string.isRequired,
	counters: PropTypes.string,
	imageCss: PropTypes.object
};

SectionAbout.defaultProps = {
	heading: '',
	text: '',
	image: Map(),
	icons: '',
	counters: null,
	imageCss: {}
};

export default SectionAbout;
