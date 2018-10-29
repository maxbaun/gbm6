import React from 'react';
import * as ImmutableProptypes from 'react-immutable-proptypes';

import {toRadians} from '../../utils/mathHelpers';
import {angleHeight} from '../../constants';

const separation = 20;

const SectionLines = ({state}) => {
	const width = window.innerWidth / Math.sin(toRadians(90 - state.get('angle')));

	const aHeight = (state.getIn(['windowSize', 'width']) * angleHeight) / 100;

	const commonStyles = {width};

	const chevron1 = {
		...commonStyles,
		left: 0,
		transform: `rotate(${state.get('angle')}deg)`,
		transformOrigin: 0,
		top: 0
	};

	const chevron2 = {
		...commonStyles,
		transform: `rotate(${state.get('angle') * -1}deg)`,
		transformOrigin: '100%',
		right: 0,
		top: 0
	};

	const topLeftToRight = {
		...commonStyles,
		transform: `rotate(${state.get('fullAngle')}deg)`,
		transformOrigin: 0,
		width,
		top: separation + 3
	};

	const topRightToLeft = {
		...commonStyles,
		transform: `rotate(${state.get('fullAngle') * -1}deg)`,
		transformOrigin: '100%',
		width,
		right: 0,
		top: separation + 3
	};

	const bottomLeftToRight = {
		...commonStyles,
		bottom: aHeight + separation,
		top: 'auto',
		transform: `rotate(${state.get('fullAngle')}deg)`,
		transformOrigin: 0
	};

	const bottomRightToLeft = {
		...commonStyles,
		bottom: aHeight + separation,
		top: 'auto',
		right: 0,
		transform: `rotate(${state.get('fullAngle') * -1}deg)`,
		transformOrigin: '100%'
	};

	return (
		<div data-lines>
			<div data-line data-line-chevron style={chevron1}/>
			<div data-line data-line-chevron style={chevron2}/>
			<div data-line data-line-toplefttoright style={topLeftToRight}/>
			<div data-line data-line-toprighttoleft style={topRightToLeft}/>
			<div data-line data-line-bottomlefttoright style={bottomLeftToRight}/>
			<div data-line data-line-bottomrighttoleft style={bottomRightToLeft}/>
		</div>
	);
};

SectionLines.propTypes = {
	state: ImmutableProptypes.map.isRequired
};

export default SectionLines;
