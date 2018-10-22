import React from 'react';
import PropTypes from 'prop-types';

const LogoPolygon = ({width, flipped, fill}) => {
	const style = {width, maxWidth: '100%', opacity: 0.6};

	if (flipped) {
		style.transform = 'rotate(180deg)';
	}

	return (
		<svg id="Layer_1" width={width} data-name="Layer 1" viewBox="0 0 163.75 8.65" style={style}>
			<polygon id="Fill-20" fill={fill} points="0 0 163.75 0 163.75 8.65 78.73 8.65 70.97 2.08 2.09 2.08 2.09 8.65 0 8.65 0 0"/>
		</svg>
	);
};

LogoPolygon.propTypes = {
	width: PropTypes.any,
	fill: PropTypes.string,
	height: PropTypes.any,
	flipped: PropTypes.bool
};

LogoPolygon.defaultProps = {
	width: '100%',
	fill: '#FFF',
	height: 10,
	flipped: false
};

export default LogoPolygon;
