import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import CSS from './sectionManager.module.scss';
import {ref} from '../../utils/componentHelpers';
import {toDegrees} from '../../utils/mathHelpers';

export default class SectionManager extends Component {
	constructor(props) {
		super(props);

		this.state = {
			init: false,
			linePositions: []
		};

		this.wrap = null;
	}

	static propTypes = {
		children: PropTypes.arrayOf(PropTypes.node).isRequired,
		template: PropTypes.string.isRequired,
		hasCta: PropTypes.bool.isRequired
	};

	componentDidMount() {
		setTimeout(() => {
			this.positionLines();
		}, 300);
	}

	positionLines() {
		const childrenArr = [...this.wrap.querySelectorAll('[data-section]')];

		const linePositions = childrenArr.map((child, index) => {
			const isFirstAndChevron = index === 1 && this.props.template === 'chevron';
			const childRect = child.getBoundingClientRect();
			const windowWidth = window.innerWidth;
			const rectWidth = isFirstAndChevron ? windowWidth / 2 : windowWidth;

			const rectHeight = (windowWidth / 100) * 18 * window.devicePixelRatio;

			const angle = Math.atan(rectHeight / rectWidth);

			const width = Math.sqrt(Math.pow(windowWidth, 2) + Math.pow(rectHeight, 2));

			const degrees = toDegrees(angle);

			this.updateLines(child, index, child.offsetTop, degrees, width);

			return {
				top: child.offsetTop,
				rotate: degrees,
				width
			};
		});

		this.setState({linePositions});
	}

	updateLines(child, index, top, rotate, width) {
		const lines = [...child.querySelectorAll('[data-line]')];

		if (!lines.length) {
			return;
		}

		const isFirstAndChevron = index === 1 && this.props.template === 'chevron';
		const isEven = index % 2 === 0;

		console.log(isEven, index);

		const transform = `rotate(${rotate}deg)`;
		const transformReverse = `rotate(${rotate * -1}deg)`;

		const commonStyles = {zIndex: -1};

		const offSet = this.props.hasCta ? 1 : 0;
		const hasOdd = (this.props.children.length - offSet) % 2 === 1;
		const hasEven = (this.props.children.length - offSet) % 2 === 0;

		if (isFirstAndChevron) {
			this.setLineStyle(lines[0], {
				width: `${width}px`,
				transform: transform,
				top: '3px',
				left: 0
			});

			this.setLineStyle(lines[1], {
				width: `${width}px`,
				transform: transformReverse,
				transformOrigin: '100%',
				top: '3px',
				right: 0
			});

			if (lines[2]) {
				this.setLineStyle(lines[2], {
					width: `${width}px`,
					transform: hasEven && !isEven ? transformReverse : transform,
					transformOrigin: '100%',
					bottom: 'calc(18vw + 30px)',
					right: 0
				});
			}
		}

		// Lines[1].style.width = `${width}px`;
		// lines[1].style.transform = isFirstAndChevron || isEven ? transformReverse : transform;
		// lines[1].style.transformOrigin = isFirstAndChevron || isEven ? '100%' : '0 0';
		// lines[1].style.top = isFirstAndChevron || !isEven ? '2px' : 'auto';
		// lines[1].style.bottom = isFirstAndChevron || !isEven ? 'auto' : 'calc(18vw + 30px)';
		// lines[1].style.right = isFirstAndChevron || isEven ? 0 : 'auto';
		// lines[1].style.zIndex = -1;

		// if (lines[3] && isFirstAndChevron) {
		// 	lines[3].style.width = `${width}px`;
		// 	lines[3].style.transform = isFirstAndChevron || isEven ? transformReverse : transform;
		// 	lines[3].style.transformOrigin = isFirstAndChevron || isEven ? '100%' : '0 0';
		// 	lines[3].style.top = isFirstAndChevron || !isEven ? '2px' : 'auto';
		// 	lines[3].style.bottom = isFirstAndChevron || !isEven ? 'auto' : 'calc(18vw + 30px)';
		// 	lines[3].style.right = isFirstAndChevron || isEven ? 0 : 'auto';
		// 	lines[3].style.zIndex = -1;
		// }
	}

	setLineStyle(line, {width, transform, transformOrigin, top, right, bottom, left}) {
		line.style.zIndex = -1;
		line.style.width = width;
		line.style.transform = transform;
		line.style.transformOrigin = transformOrigin;
		line.style.top = top;
		line.style.right = right;
		line.style.bottom = bottom;
		line.style.left = left;
	}

	render() {
		const {hasCta, children, template} = this.props;

		const offSet = hasCta ? 1 : 0;
		return (
			<Fragment>
				<div className={CSS.lineWrap} data-template={template}>
					{children.map((c, index) => {
						// If it's the first section, don't render any lines
						if (index === 0 || this.state.linePositions.length === 0) {
							return null;
						}

						return null;

						const currentPosition = this.state.linePositions[index];

						const currentStyle = {top: currentPosition.top, width: currentPosition.width};

						const rotate = `rotate(${currentPosition.rotate}deg)`;

						const isFirstAndChevron = index === 1 && template === 'chevron';

						const line1Style = {
							...currentStyle,
							transform: rotate,
							transformOrigin: '0 0'
						};

						const line2Style = {
							...currentStyle,
							transform: isFirstAndChevron ? `rotate(${currentPosition.rotate * -1}deg) ` : rotate,
							transformOrigin: isFirstAndChevron ? '100%' : '0 0',
							left: isFirstAndChevron ? 'auto' : 0,
							right: isFirstAndChevron ? 0 : 'auto'
						};

						return (
							// eslint-disable-next-line react/no-array-index-key
							<div key={index} className={CSS.lines}>
								<div className={CSS.line} style={line1Style}/>
								<div className={CSS.line} style={line2Style}/>
							</div>
						);
					})}
				</div>
				<div
					ref={ref.call(this, 'wrap')}
					className={CSS.sectionManager}
					data-template={template}
					data-odd={(children.length - offSet) % 2 === 1}
					data-even={(children.length - offSet) % 2 === 0}
				>
					{children}
				</div>
			</Fragment>
		);
	}
}
