import React, {Component} from 'react';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {debounce} from 'lodash';

import {selectors as stateSelectors} from '../../ducks/state';
import {toRadians} from '../../utils/mathHelpers';
import {angleHeight} from '../../constants';

const separation = 20;

const mapStateToProps = state => ({
	state: stateSelectors.getState(state)
});

class SectionLines extends Component {
	constructor(props) {
		super(props);

		this.state = {
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
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	handleResize() {
		const windowWidth = window.innerWidth;

		const {state} = this.props;
		const width = windowWidth / Math.sin(toRadians(90 - state.get('angle')));

		const aHeight = (windowWidth * angleHeight) / 100;

		const commonStyles = {width};

		const chevron1 = {
			...commonStyles,
			left: 0,
			transform: `rotate(${state.get('angle')}deg)`,
			transformOrigin: 0,
			top: 2.9
		};

		const chevron2 = {
			...commonStyles,
			transform: `rotate(${state.get('angle') * -1}deg)`,
			transformOrigin: '100%',
			right: 0,
			top: 2.9
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
		const {state} = this.props;

		let active = false;

		if (state.get('pageTransitioning') === false) {
			active = true;
		}

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

export default connect(mapStateToProps)(SectionLines);
