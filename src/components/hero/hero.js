import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';

import CSS from './hero.module.scss';
import Markdown from '../common/markdown';
import {toDegrees} from '../../utils/mathHelpers';
import {ref} from '../../utils/componentHelpers';
import {responsive} from '../../constants';

export default class Hero extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstLine: {},
			secondLine: {},
			imageStyle: {},
			contentInner: {}
		};

		this.elem = null;
	}

	static propTypes = {
		image: ImmutablePropTypes.map,
		doubleAngle: PropTypes.bool,
		state: ImmutablePropTypes.map,
		content: PropTypes.string
	};

	static defaultProps = {
		image: Map(),
		doubleAngle: true,
		state: Map(),
		content: null
	};

	componentDidMount() {
		if (this.props.doubleAngle) {
			this.setAngleLineHyp();
		} else {
			this.setSingleAngleLines();
		}
	}

	setSingleAngleLines() {
		if (!this.elem) {
			return;
		}
		const {width: windowWidth} = this.props.state.get('windowSize').toJS();

		const width = this.elem.offsetWidth;
		const height = this.elem.offsetHeight;

		const imagePercent = windowWidth < responsive.tablet ? 0.6 : 0.5;
		const clippedHeight = 1 - imagePercent;

		const triHeight = height * clippedHeight;
		const triWidth = width;

		const hypLen = Math.sqrt(Math.pow(triHeight, 2) + Math.pow(triWidth, 2));

		const ang = Math.asin(triWidth / hypLen);

		const transform = 90 - toDegrees(ang);
		const lineWidth = hypLen * 2;

		const lineTop = imagePercent * 100;

		const lineStyle = {
			position: 'absolute',
			transform: `rotate(${transform}deg)`,
			transformOrigin: '0 0',
			top: `${lineTop}%`,
			width: lineWidth
		};

		this.setState({
			firstLine: {
				marginTop: -20,
				...lineStyle
			},
			secondLine: {
				marginTop: 20,
				...lineStyle
			},
			contentInner: {
				marginBottom: triHeight
			},
			imageStyle: {
				clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 ${imagePercent * 100}%)`
			}
		});
	}

	setAngleLineHyp() {
		if (!this.elem) {
			return;
		}
		// Const {width, height} = this.props.state.get('windowSize').toJS();
		const {width: windowWidth} = this.props.state.get('windowSize').toJS();

		const width = this.elem.offsetWidth;
		const height = this.elem.offsetHeight;

		const imagePercent = 75;
		const clippedHeight = (100 - imagePercent) / 100;

		const triHeight = height * clippedHeight;
		const triWidth = width / 2;

		const hypLen = Math.sqrt(Math.pow(triHeight, 2) + Math.pow(triWidth, 2));

		const ang = Math.asin(triWidth / hypLen);

		const transform = 90 - toDegrees(ang);
		const lineWidth = hypLen * 2;

		const lineStyle = {
			position: 'absolute',
			top: `${imagePercent}%`,
			width: lineWidth
		};

		this.setState({
			firstLine: {
				left: 0,
				transform: `rotate(${transform}deg)`,
				transformOrigin: '0 0',
				...lineStyle
			},
			secondLine: {
				right: 0,
				transform: `rotate(${transform * -1}deg)`,
				transformOrigin: '100%',
				...lineStyle
			},
			contentInner: {
				marginBottom: windowWidth < responsive.tablet ? triHeight : 0
			},
			imageStyle: {
				clipPath: `polygon(50% 0%, 100% 0, 100% ${imagePercent}%, 50% 100%, 50% 100%, 0% ${imagePercent}%, 0 0)`
			}
		});
	}

	render() {
		const {doubleAngle} = this.props;

		const compileWrapCss = [CSS.hero];

		if (doubleAngle) {
			compileWrapCss.push(CSS.heroDoubleAngle);
		} else {
			compileWrapCss.push(CSS.heroSingleAngle);
		}

		return (
			<div ref={ref.call(this, 'elem')} className={compileWrapCss.join(' ')}>
				<div className={CSS.image} style={this.state.imageStyle}>
					<img src={this.props.image.get('src')}/>
				</div>
				<span className={CSS.line} style={this.state.firstLine}/>
				<span className={CSS.line} style={this.state.secondLine}/>
				<div className={CSS.content}>
					<Markdown className={CSS.contentInner} content={this.props.content} style={this.state.contentInner}/>
				</div>
			</div>
		);
	}
}
