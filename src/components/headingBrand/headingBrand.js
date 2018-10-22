import React from 'react';
import PropTypes from 'prop-types';

import CSS from './headingBrand.module.scss';
import LogoPolygon from '../common/logoPolygon';
import Markdown from '../common/markdown';

const HeadingBrand = ({heading, isMobile, width}) => {
	return (
		<div className={CSS.headingBrand} style={{maxWidth: '100%', width, margin: isMobile ? '0 auto' : ''}}>
			<div className={CSS.polygon}>
				<LogoPolygon width={width} height={27}/>
			</div>
			<div className={CSS.heading} style={{width: width, maxWidth: '100%'}}>
				<Markdown content={heading}/>
			</div>
			<div className={CSS.polygon}>
				<LogoPolygon flipped width={width} height={27}/>
			</div>
		</div>
	);
};

HeadingBrand.propTypes = {
	heading: PropTypes.string,
	isMobile: PropTypes.bool,
	width: PropTypes.number
};

HeadingBrand.defaultProps = {
	heading: '',
	isMobile: false,
	width: 554
};

export default HeadingBrand;
