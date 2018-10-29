import React from 'react';
import * as ImmutableProptypes from 'react-immutable-proptypes';

import CSS from './sectionTestimonials.module.scss';
import Markdown from '../common/markdown';
import SectionLines from '../common/sectionLines';
import Masonry from '../masonry/masonry';

const SectionTestimonials = ({testimonials}) => {
	return (
		<div data-section className={CSS.section}>
			<div data-clip-target>
				<SectionLines/>
				<div className="container">
					<div className={CSS.contain}>
						<div className={CSS.quote}>“</div>
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
					</div>
				</div>
			</div>
		</div>
	);
};

SectionTestimonials.propTypes = {
	testimonials: ImmutableProptypes.list.isRequired
};

export default SectionTestimonials;
