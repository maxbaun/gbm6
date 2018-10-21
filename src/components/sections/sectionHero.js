import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';

import CSS from './sectionHero.module.scss';
import Markdown from '../common/markdown';
import ScrollTo from '../common/scrollTo';
import {toDegrees, toRadians} from '../../utils/mathHelpers';
import {ref, noop, windowWidthChange, sectionAngleHeight, sectionAngle} from '../../utils/componentHelpers';
import {responsive} from '../../constants';

export default class SectionHero extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstLine: {},
			secondLine: {},
			firstScrollLine: {},
			secondScrollLine: {},
			imageStyle: {},
			contentInner: {}
		};

		this.image = null;
	}

	static propTypes = {
		image: ImmutablePropTypes.map,
		doubleAngle: PropTypes.bool,
		state: ImmutablePropTypes.map,
		content: PropTypes.string,
		imageCss: PropTypes.object,
		scrollColor: PropTypes.string,
		scrollTo: PropTypes.string,
		onHeroBleedChange: PropTypes.func
	};

	static defaultProps = {
		image: Map(),
		doubleAngle: true,
		state: Map(),
		content: null,
		imageCss: {},
		scrollColor: '#FFF',
		scrollTo: null,
		onHeroBleedChange: noop
	};

	componentDidMount() {
		this.initAngle();
	}

	componentDidUpdate(prevProps) {
		if (windowWidthChange(this.props, prevProps)) {
			this.initAngle();
		}
	}

	initAngle() {
		if (this.props.doubleAngle) {
			this.setAngleLineHyp();
		} else {
			this.setSingleAngleLines();
		}
	}

	setSingleAngleLines() {
		if (!this.image) {
			return;
		}
		const {width: windowWidth} = this.props.state.get('windowSize').toJS();

		const width = this.image.offsetWidth;
		const height = this.image.offsetHeight;

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

		this.props.onHeroBleedChange(triHeight);

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
		if (!this.image) {
			return;
		}
		// Const {width, height} = this.props.state.get('windowSize').toJS();
		const {width: windowWidth} = this.props.state.get('windowSize').toJS();

		const ww = window.innerWidth;

		const tHeight = (ww / 100) * 20 * window.devicePixelRatio;
		const an = Math.atan(tHeight / ww);

		console.log(tHeight, ww);
		console.log(toDegrees(an));

		const rect = this.image.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;

		const triAngle = sectionAngle(this.props.state);
		const triAngleRad = toRadians(triAngle);

		// Const triHeight = height * clippedHeight;
		const triWidth = width / 2;
		const triHeight = Math.sin(triAngleRad) * triWidth;

		const triPercentageBottom = 100 - (triHeight * 100) / height;

		const hypLen = Math.sqrt(Math.pow(triHeight, 2) + Math.pow(triWidth, 2));

		const ang = Math.asin(triWidth / hypLen);

		const transform = 90 - toDegrees(ang);
		const lineWidth = hypLen * 2;

		const lineStyle = {
			position: 'absolute',
			top: `${triPercentageBottom}%`,
			width: lineWidth
		};

		this.props.onHeroBleedChange(triHeight);

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
			firstScrollLine: {
				transform: `skew(0deg, ${transform}deg)`
			},
			secondScrollLine: {
				transform: `skew(0deg, ${transform * -1}deg)`
			},
			contentInner: {
				marginBottom: windowWidth < responsive.tablet ? triHeight : 0
			},
			imageStyle: {
				clipPath: `polygon(0 0, 100% 0, 100% ${triPercentageBottom}%, 50% 100%, 0 ${triPercentageBottom}%)`
			}
		});
	}

	render() {
		const {doubleAngle, scrollColor, scrollTo} = this.props;

		const compileWrapCss = [CSS.hero];

		if (doubleAngle) {
			compileWrapCss.push(CSS.heroDoubleAngle);
		} else {
			compileWrapCss.push(CSS.heroSingleAngle);
		}

		return (
			<div data-section className={compileWrapCss.join(' ')}>
				<div
					ref={ref.call(this, 'image')}
					className={CSS.image}
					style={{
						// ...this.state.imageStyle,
						...this.props.imageCss,
						backgroundImage: `url(${this.props.image.get('src')})`
					}}
				/>
				{scrollTo && scrollTo !== '' ? (
					<ScrollTo target={scrollTo}>
						<div className={CSS.scroll}>
							<div className={CSS.scrollLine} style={{...this.state.firstScrollLine, backgroundColor: scrollColor}}/>
							<div className={CSS.scrollLine} style={{...this.state.secondScrollLine, backgroundColor: scrollColor}}/>
						</div>
					</ScrollTo>
				) : null}

				<span className={CSS.line} style={this.state.firstLine}/>
				<span className={CSS.line} style={this.state.secondLine}/>
				<div className={CSS.content}>
					<Markdown className={CSS.contentInner} content={this.props.content} style={this.state.contentInner}/>
				</div>
			</div>
		);
	}
}
