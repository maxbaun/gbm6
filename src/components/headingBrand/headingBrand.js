import React from 'react';
import PropTypes from 'prop-types';
import FitText from 'react-fittext';
import Remarkable from 'remarkable';

import CSS from './headingBrand.module.scss';
import LogoPolygon from '../common/logoPolygon';
import {innerHtml} from '../../utils/componentHelpers';

const md = new Remarkable({
	html: true
});

const HeadingBrand = ({heading}) => {
	const parsed = md.render(heading);
	return (
		<div className={CSS.wrap}>
			<div className={CSS.polygon}>
				<LogoPolygon height={27}/>
			</div>
			<div className={CSS.heading}>
				<FitText minFontSize={32}>
					{/* eslint-disable-next-line react/no-danger */}
					<div dangerouslySetInnerHTML={innerHtml(parsed)}/>
				</FitText>
			</div>
			<div className={CSS.polygon}>
				<LogoPolygon flipped height={27}/>
			</div>
		</div>
	);
};

HeadingBrand.propTypes = {
	heading: PropTypes.string
};

HeadingBrand.defaultProps = {
	heading: ''
};

export default HeadingBrand;
