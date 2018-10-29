import React from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';

import CSS from './sectionPortfolioContent.module.scss';
import HeadingBrand from '../headingBrand/headingBrand';
import Markdown from '../common/markdown';
import SectionLines from '../common/sectionLines';

const SectionPortfolioContent = ({title, content, date, location, talent}) => {
	const meta = fromJS([{title: 'Date', text: date}, {title: 'Location', text: location}, {title: 'Talent', text: talent}]);

	return (
		<div data-section className={CSS.section}>
			<div data-clip-target>
				<SectionLines/>
				<div className="container">
					<div className={CSS.inner}>
						<div className={CSS.header}>
							<div className="row">
								<div className="col-sm-5 offset-sm-1">
									<div className={CSS.heading}>
										<HeadingBrand heading={`# ${title}`}/>
									</div>
								</div>
								<div className="col-sm-6 col-md-5 offset-md-1 ">
									<div className={CSS.meta}>
										<ul className={CSS.metaList}>{meta.map(renderMeta)}</ul>
									</div>
								</div>
							</div>
						</div>
						{content && content !== '' ? (
							<div className="row">
								<div className="col-sm-8 col-md-8 col-lg-6 offset-sm-2 offset-md-2 offset-lg-3">
									<Markdown className={CSS.content} content={content}/>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

const renderMeta = (meta, index) => {
	const {title, text} = meta.toJS();

	if (!text || text === '') {
		return null;
	}

	return (
		<li key={index} className={CSS.metaBlock}>
			<h4 className={CSS.metaTitle}>{title}</h4>
			<h3 className={CSS.metaText}>{text}</h3>
		</li>
	);
};

SectionPortfolioContent.propTypes = {
	title: PropTypes.string,
	content: PropTypes.string,
	date: PropTypes.string,
	location: PropTypes.string,
	talent: PropTypes.string
};

SectionPortfolioContent.defaultProps = {
	title: null,
	content: null,
	date: null,
	location: null,
	talent: null
};

export default SectionPortfolioContent;
