import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';

import CSS from './sectionFeatured.module.scss';
import HeadingBrand from '../headingBrand/headingBrand';
import Image from '../common/image';
import {chunkList} from '../../utils/componentHelpers';

const SectionFeatured = ({images, heading}) => {
	const imageRows = chunkList(images, 2);

	return (
		<div data-section className={CSS.section}>
			<div className="container">
				<div className={CSS.inner}>
					<div className={CSS.row}>
						<div className={CSS.col}>
							<div className={CSS.heading}>
								<HeadingBrand heading={heading}/>
							</div>
						</div>
						<div className={CSS.col}>
							<div className={CSS.images}>
								{imageRows.map((row, index) => {
									return (
										// eslint-disable-next-line react/no-array-index-key
										<ul key={index} className={CSS.imageRow}>
											{row.map((image, index) => {
												return (
													// eslint-disable-next-line react/no-array-index-key
													<li key={index} className={CSS.imageCol}>
														<div className={CSS.image}>
															<Image image={image}/>
														</div>
													</li>
												);
											})}
										</ul>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

SectionFeatured.propTypes = {
	images: ImmutableProptypes.list.isRequired,
	heading: PropTypes.string.isRequired
};

export default SectionFeatured;
