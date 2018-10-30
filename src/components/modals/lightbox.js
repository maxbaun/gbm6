import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {Motion, spring, presets} from 'react-motion';
import {List} from 'immutable';
import Swiper from 'swiper';
import {connect} from 'react-redux';

import CSS from './lightbox.module.scss';
import {selectors as stateSelectors} from '../../ducks/state';
import Close from '../close/close';
import Image from '../common/image';
import {ref} from '../../utils/componentHelpers';

const mapStateToProps = state => ({
	state: stateSelectors.getState(state)
});

class Lightbox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visibility: 'hidden',
			display: 'none',
			active: props.active,
			layout: 'portrai',
			carouselActive: false
		};

		this.carousel = null;
		this.swiper = null;

		this.handleRest = this.handleRest.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	static propTypes = {
		active: PropTypes.bool,
		onClose: PropTypes.func,
		onShow: PropTypes.func,
		images: ImmutableProptypes.list,
		start: PropTypes.number,
		state: ImmutableProptypes.map.isRequired
	};

	static defaultProps = {
		active: false,
		onClose: () => {},
		onShow: () => {},
		images: List(),
		start: 1
	};

	static getDerivedStateFromProps(props, state) {
		const {height: windowHeight, width: windowWidth} = props.state.get('windowSize').toJS();

		return {
			...state,
			layout: windowHeight < windowWidth ? 'landscape' : 'portrait',
			active: props.active,
			visibility: props.active ? 'visible' : state.visibility,
			display: props.active ? 'block' : state.display
		};
	}

	componentDidUpdate() {
		if (this.state.active) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
	}

	initSlider() {
		const container = this.carousel.querySelector('.swiper-container');
		const options = {
			loop: false,
			direction: 'horizontal',
			slidesPerView: 1,
			initialSlide: this.props.start,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				bulletClass: CSS.paginationBullet,
				bulletActiveClass: CSS.paginationBulletActive
			}
		};

		this.swiper = new Swiper(container, options);

		this.setState({carouselActive: true});
	}

	handleRest() {
		const {active} = this.state;

		if (!active) {
			if (this.swiper) {
				this.swiper.destroy();
			}

			return this.setState({
				visibility: 'hidden',
				display: 'none',
				carouselActive: false
			});
		}

		this.initSlider();

		return this.props.onShow();
	}

	handleClose() {
		document.querySelector('body').style.overflow = null;
		this.props.onClose();
	}

	render() {
		const {visibility, display, active, carouselActive} = this.state;

		return (
			<div className={CSS.wrap} style={{visibility}}>
				<Motion
					defaultStyle={{
						opacity: 0,
						x: 0.8,
						y: 0.8,
						top: 4,
						fog: 0
					}}
					style={{
						opacity: active ? spring(1, presets.stiff) : spring(0, presets.stiff),
						x: active ? spring(1, presets.stiff) : spring(0.8, presets.stiff),
						y: active ? spring(1, presets.stiff) : spring(0.8, presets.stiff),
						top: active ? spring(0, presets.stiff) : spring(0, presets.stiff),
						fog: active ? spring(0.7, presets.stiff) : spring(0, presets.stiff)
					}}
					onRest={this.handleRest}
				>
					{styles => {
						const modalStyle = {
							visibility: visibility,
							display: display,
							opacity: styles.opacity,
							transform: `scaleX(${styles.x}) scaleY(${styles.y})`
						};

						const carouselCss = [CSS.carousel];

						if (carouselActive) {
							carouselCss.push(CSS.carouselActive);
						}

						return (
							<Fragment>
								<div className={CSS.lightbox} style={modalStyle}>
									<div className={CSS.lightboxInner}>
										<span style={{opacity: styles.opacity > 0 ? styles.opacity : 0}} className={CSS.close}>
											<Close backgroundColor="#FAFAFA" onClick={this.handleClose}/>
										</span>
										<div ref={ref.call(this, 'carousel')} className={carouselCss.join(' ')}>
											<div className="swiper-container">
												<div className="swiper-wrapper">
													{this.props.images.map(image => {
														const imageCss = [CSS.image];

														imageCss.push(this.state.layout === 'landscape' ? CSS.imageTall : '');
														return (
															<div key={image.getIn(['sys', 'id'])} className="swiper-slide">
																<Image className={imageCss.join(' ')} image={image}/>
															</div>
														);
													})}
												</div>
												<div className={CSS.pagination}>
													<div className="swiper-pagination"/>
												</div>
												<div className={CSS.nav}>
													<div className={['swiper-button-prev', CSS.prev].join(' ')}>
														<span className="fas fa-angle-left"/>
													</div>
													<div className={['swiper-button-next', CSS.next].join(' ')}>
														<span className="fas fa-angle-right"/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									className={CSS.fog}
									style={{
										visibility: visibility,
										opacity: styles.fog
									}}
									onClick={this.handleClose}
								/>
							</Fragment>
						);
					}}
				</Motion>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Lightbox);
