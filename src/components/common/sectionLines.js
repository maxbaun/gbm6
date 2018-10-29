import React, {Component} from 'react';
import * as ImmutableProptypes from 'react-immutable-proptypes';

import {toRadians} from '../../utils/mathHelpers';
import {debounce} from '../../utils/componentHelpers';
import {angleHeight} from '../../constants';

const separation = 20;

export default class SectionLines extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false,
			styles: {
				chevron1: {},
				chevron2: {},
				topLeftToRight: {},
				topRightToLeft: {},
				bottomLeftToRight: {},
				bottomRightToLeft: {}
			}
		};

		this.handleResize = debounce(this.handleResize.bind(this), 150);
	}

	static propTypes = {
		state: ImmutableProptypes.map.isRequired
	};

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();

		setTimeout(() => {
			this.init();
		}, 1000);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	init() {
		this.setState({active: true});
	}

	handleResize() {
		const {state} = this.props;
		const width = window.innerWidth / Math.sin(toRadians(90 - state.get('angle')));

		const aHeight = (window.innerWidth * angleHeight) / 100;

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

		this.setState({
			styles: {
				chevron1,
				chevron2,
				topLeftToRight,
				topRightToLeft,
				bottomLeftToRight,
				bottomRightToLeft
			}
		});
	}

	render() {
		const {chevron1, chevron2, topLeftToRight, topRightToLeft, bottomLeftToRight, bottomRightToLeft} = this.state.styles;
		const {active} = this.state;

		return (
			<div data-lines>
				<div data-line data-line-chevron data-line-active={active} style={chevron1}/>
				<div data-line data-line-chevron data-line-active={active} style={chevron2}/>
				<div data-line data-line-toplefttoright data-line-active={active} style={topLeftToRight}/>
				<div data-line data-line-toprighttoleft data-line-active={active} style={topRightToLeft}/>
				<div data-line data-line-bottomlefttoright data-line-active={active} style={bottomLeftToRight}/>
				<div data-line data-line-bottomrighttoleft data-line-active={active} style={bottomRightToLeft}/>
			</div>
		);
	}
}
