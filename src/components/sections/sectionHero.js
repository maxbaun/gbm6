import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List, Map} from 'immutable';
import Swiper from 'swiper';

import CSS from './sectionHero.module.scss';
import Markdown from '../common/markdown';
import ScrollTo from '../common/scrollTo';
import Image from '../common/image';
import SliderNav from '../sliderNav/sliderNav';
import {ref, click, vimeoId} from '../../utils/componentHelpers';
import PlayBtn from '../playBtn/playBtn';
import SectionLines from '../common/sectionLines';

export default class SectionHero extends Component {
	constructor(props) {
		super(props);

		this.carousel = null;
		this.swiper = null;
	}

	static propTypes = {
		images: ImmutablePropTypes.list,
		content: PropTypes.string,
		imageCss: PropTypes.object,
		scrollColor: PropTypes.string,
		scrollTo: PropTypes.string,
		className: PropTypes.string,
		video: PropTypes.string,
		state: ImmutablePropTypes.map,
		actions: PropTypes.objectOf(PropTypes.func).isRequired
	};

	static defaultProps = {
		images: List(),
		content: null,
		imageCss: {},
		scrollColor: '#FFF',
		scrollTo: null,
		className: null,
		video: null,
		state: Map()
	};

	componentDidMount() {
		if (this.carousel) {
			this.initSwiper();
		}
	}

	shouldRenderCarousel() {
		return this.props.images.count() > 1 && (!this.props.video || this.props.video === '');
	}

	initSwiper() {
		const container = this.carousel.querySelector('.swiper-container');

		const options = {
			loop: false,
			direction: 'horizontal',
			slidesPerView: 1,
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
	}

	render() {
		const {scrollColor, scrollTo, images, imageCss, content, className, video, state, actions} = this.props;

		const heroCss = [CSS.hero];

		if (className && CSS[className]) {
			heroCss.push(CSS[className]);
		}

		const contentCss = [CSS.content];

		if (state.get('pageTransitioning') === false) {
			contentCss.push(CSS.contentActive);
		}

		return (
			<div data-section className={heroCss.join(' ')}>
				{this.shouldRenderCarousel() ? (
					this.renderCarousel()
				) : (
					<Fragment>
						<Image background style={imageCss} className={CSS.image} image={images.first()}/>
						{content && content !== '' ? <div className={CSS.imageOverlay}/> : null}
					</Fragment>
				)}
				{video && video !== '' ? (
					<Fragment>
						<div className={CSS.playOverlay}>
							<PlayBtn size={119} onClick={click(actions.offmenuToggle, vimeoId(video))}/>
						</div>
					</Fragment>
				) : null}
				{scrollTo && scrollTo !== '' ? (
					<ScrollTo target={scrollTo}>
						<div className={CSS.scroll}>
							<div
								className={CSS.scrollLine}
								style={{
									backgroundColor: scrollColor,
									transform: `rotate(${state.get('angle')}deg)`,
									transformOrigin: '100%'
								}}
							/>
							<div
								className={CSS.scrollLine}
								style={{
									backgroundColor: scrollColor,
									transform: `rotate(${state.get('angle') * -1}deg)`,
									transformOrigin: '0'
								}}
							/>
						</div>
					</ScrollTo>
				) : null}
				{content && content !== '' ? (
					<div className={contentCss.join(' ')}>
						<Markdown className={CSS.contentInner} content={content}/>
					</div>
				) : null}
				{this.shouldRenderCarousel() ? null : (
					<div data-clip>
						<SectionLines state={state}/>
					</div>
				)}
			</div>
		);
	}

	renderCarousel() {
		return (
			<div ref={ref.call(this, 'carousel')} className={CSS.carousel}>
				<div className="swiper-container">
					<div className="swiper-wrapper">
						{this.props.images.map(image => {
							return (
								<div key={image.getIn(['sys', 'id'])} className="swiper-slide">
									<Image background style={this.props.imageCss} className={CSS.image} image={image}/>
								</div>
							);
						})}
					</div>
					<div className={CSS.pagination}>
						<div className="swiper-pagination"/>
					</div>
					<div data-clip>
						<SectionLines state={this.props.state}/>
						<div className={CSS.nav}>
							<SliderNav/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
