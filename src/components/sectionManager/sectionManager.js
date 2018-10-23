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

		const linePositions = childrenArr.map(child => {
			const childRect = child.getBoundingClientRect();

			const rectHeight = (window.innerWidth / 100) * 18 * window.devicePixelRatio;

			const angle = Math.atan(rectHeight / window.innerWidth);

			const width = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(rectHeight, 2));

			const degrees = 90 - toDegrees(angle);

			console.log(degrees);

			return {
				top: child.offsetTop,
				rotate: degrees,
				width
			};
		});

		this.setState({linePositions});
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

						const currentPosition = this.state.linePositions[index];

						const currentStyle = {top: currentPosition.top, width: currentPosition.width};

						const rotate = `rotate(${currentPosition.rotate}deg)`;

						const line1Style = {
							...currentStyle,
							transform: rotate,
							transformOrigin: '0 0'
						};

						const line2Style = {
							...currentStyle,
							transform: template === 'chevron' ? `rotate(${currentPosition.rotate * -1}deg) ` : rotate,
							transformOrigin: template === 'chevron' ? '100%' : '0 0',
							left: template === 'chevron' ? 'auto' : 0,
							right: template === 'chevron' ? 0 : 'auto'
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
