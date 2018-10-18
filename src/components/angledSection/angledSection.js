import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';

import CSS from './angledSection.module.scss';
import {ref, noop, windowWidthChange, sectionAngle} from '../../utils/componentHelpers';
import {toDegrees, toRadians} from '../../utils/mathHelpers';
import {responsive} from '../../constants';

export default class AngledSection extends Component {
	constructor(props) {
		super(props);

		this.state = {
			angle: 0,
			clipBottom: 100,
			clipTop: 0,
			clipTopHalf: 0
		};

		this.elem = null;

		this.setSectionAngle = this.setSectionAngle.bind(this);
		this.getStyle = this.getStyle.bind(this);
	}

	static propTypes = {
		state: ImmutableProptypes.map.isRequired,
		children: PropTypes.node.isRequired,
		angleBottom: PropTypes.bool,
		angleTop: PropTypes.bool,
		slantDirection: PropTypes.oneOf(['left', 'right']),
		onAngleChange: PropTypes.func,
		topAngleDirection: PropTypes.oneOf(['topV', 'left', 'right']),
		prevSectionBleed: PropTypes.number
	};

	static defaultProps = {
		angleBottom: true,
		angleTop: true,
		slantDirection: 'left',
		onAngleChange: noop,
		topAngleDirection: 'left',
		prevSectionBleed: 0
	};

	componentDidMount() {
		console.log('comp did mount');
		setTimeout(() => {
			this.setSectionAngle();
		}, 1000);
	}

	componentDidUpdate(prevProps) {
		if (windowWidthChange(this.props, prevProps) || this.props.prevSectionBleed !== prevProps.prevSectionBleed) {
			this.setSectionAngle();
		}
	}

	setSectionAngle() {
		if (!this.elem) {
			return;
		}
		// Const {width, height} = this.props.state.get('windowSize').toJS();
		const {width: windowWidth} = this.props.state.get('windowSize').toJS();

		const rect = this.elem.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;

		const triAngle = sectionAngle(this.props.state);
		const triAngleRad = toRadians(triAngle);

		const triWidth = width;
		const triHeight = Math.sin(triAngleRad) * triWidth;

		const triPercentageBottom = 100 - (triHeight * 100) / height;
		const triPercentageTop = (triHeight * 100) / height;

		const halfWidth = triWidth / 2;
		const halfHeight = Math.sin(triAngleRad) * halfWidth;

		const halfPercentageBottom = 100 - (halfHeight * 100) / height;
		const halfPercentageTop = (halfHeight * 100) / height;

		this.props.onAngleChange(triHeight);

		this.setState({
			angle: triAngle,
			clipBottom: triPercentageBottom,
			clipTop: triPercentageTop,
			clipTopHalf: triPercentageTop / 2, // HalfPercentageTop,
			clipBottomHalf: halfPercentageBottom
		});
	}

	getStyle() {
		const {slantDirection, angleBottom, angleTop} = this.props;
		const {clipBottom, clipTop} = this.state;

		let style = {};

		const clipTopStyle = this.getTopAngleStyle();
		const clipBottomStyle = this.getBottomAngleStyle();

		style.clipPath = `polygon(${clipTopStyle}, ${clipBottomStyle})`;

		// If (slantDirection === 'right') {
		// } else {
		// 	style.clipPath = `polygon(0 0, 100% ${angleTop ? clipTop + '%' : 0}, 100% ${angleBottom ? clipBottom : '100'}%, 0 100%)`;
		// }

		return style;
	}

	getTopAngleStyle() {
		const {topAngleDirection, angleTop} = this.props;
		const {clipTopHalf, clipTop} = this.state;

		if (topAngleDirection === 'topV') {
			return `0 0, 50% ${clipTopHalf}%, 100% 0`;
		}

		if (topAngleDirection === 'right') {
			return `0 ${angleTop ? clipTop + '%' : 0}, 100% 0`;
		}

		return `0 0, 100% ${angleTop ? clipTop + '%' : 0}`;
	}

	getBottomAngleStyle() {
		const {slantDirection} = this.props;
		const {clipBottom} = this.state;

		if (slantDirection === 'left') {
			return `100% 100%, 0 ${clipBottom}%`;
		}

		return `100% ${clipBottom}%, 0 100%`;
	}

	render() {
		const {clipBottom} = this.state;
		const {angleBottom} = this.props;

		return (
			<div ref={ref.call(this, 'elem')} className={CSS.section} style={this.getStyle()}>
				{this.props.children}
			</div>
		);
	}
}
