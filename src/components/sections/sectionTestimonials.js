import React from 'react';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import CSS from './sectionTestimonials.module.scss';
import Markdown from '../common/markdown';
import Masonry from '../masonry/masonry';
import InView from '../hoc/inView';

const SectionTestimonials = ({testimonials, hasAppeared}) => {
	return (
		<div data-section className={CSS.section}>
			<div className={CSS.wrap}>
				<div className={CSS.inner}>
					<div className={CSS.quote}>“</div>
					{hasAppeared ? (
						<div className={CSS.testimonials}>
							<Masonry items={testimonials} perGroup={testimonials.count()} columnWidth={400} gridGap={10}>
								{testimonials
									.map((testimonial, index) => {
										return (
											// eslint-disable-next-line react/no-array-index-key
											<div key={index} className={CSS.testimonial}>
												<div className={CSS.testimonialContent}>
													<Markdown content={testimonial.getIn(['fields', 'text'])}/>
												</div>
												<div className={CSS.testimonialName}>{testimonial.getIn(['fields', 'name'])}</div>
												<div className={CSS.testimonialSubtitle}>{testimonial.getIn(['fields', 'subtitle'])}</div>
											</div>
										);
									})
									.toJS()}
							</Masonry>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

SectionTestimonials.propTypes = {
	testimonials: ImmutableProptypes.list.isRequired,
	hasAppeared: PropTypes.bool.isRequired
};

export default InView(SectionTestimonials, {partialVisibility: true, delayedCall: true});