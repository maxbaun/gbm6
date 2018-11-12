import React from 'react';
import PropTypes from 'prop-types';

import CSS from './post.module.scss';
import Image from '../common/image';
import Markdown from '../common/markdown';
import SectionLines from '../common/sectionLines';
import HeadingBrand from '../headingBrand/headingBrand';

const Post = ({title, image, content}) => {
	return (
		<div data-section className={CSS.post}>
			<div data-clip-target>
				<SectionLines/>
				<div className={CSS.hero}>
					<div className={CSS.image}>
						<Image image={image}/>
					</div>
					{title ? (
						<div className={CSS.heroContent}>
							<div className="container">
								<div className={CSS.title}>
									<HeadingBrand heading={`# ${title}`}/>
								</div>
							</div>
						</div>
					) : null}
				</div>
				<div className={CSS.body}>
					<div className="container">
						<div className="row">
							<div className="col-12 offset-md-1 col-md-10">
								<Markdown className={CSS.content} content={content}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

};

Post.propTypes = {
	title: PropTypes.string,
	image: PropTypes.object,
	content: PropTypes.string
};

Post.defaultProps = {
	title: null,
	image: null,
	content: null
}

export default Post;
