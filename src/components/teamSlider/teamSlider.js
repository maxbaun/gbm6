import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {Map, List} from 'immutable';
import Swiper from 'swiper';

import CSS from './teamSlider.module.scss';
import SliderNav from '../sliderNav/sliderNav';
import {ref, windowWidthChange, click, debounce} from '../../utils/componentHelpers';
import {responsive} from '../../constants';

const TeamSize = 307;
const TeamSpacing = 7;

export default class TeamSlider extends Component {
	constructor(props) {
		super(props);

		this.swiper = null;
		this.wrap = null;

		this.state = {
			activeIndex: 0
		};

		this.handleSlideChange = this.handleSlideChange.bind(this);
		this.updateSlider = debounce(this.updateSlider.bind(this), 300);
	}

	static propTypes = {
		team: ImmutableProptypes.list,
		state: ImmutableProptypes.map
	};

	static defaultProps = {
		team: List(),
		state: Map()
	};

	componentDidMount() {
		this.initSwiper();
	}

	componentDidUpdate(nextProps) {
		if (windowWidthChange(this.props, nextProps)) {
			this.updateSlider();
		}
	}

	updateSlider() {
		this.initSwiper();
	}

	initSwiper() {
		const container = this.wrap.querySelector('.swiper-container');
		const options = {
			loop: false,
			direction: 'horizontal',
			spaceBetween: 7,
			slidesPerView: this.wrap.offsetWidth / TeamSize,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		};

		this.swiper = new Swiper(container, options);
	}

	handleSlideChange(activeIndex) {
		if (activeIndex > this.props.team.count() - 1) {
			activeIndex = 0;
		}

		if (activeIndex < 0) {
			activeIndex = this.props.team.count() - 1;
		}

		console.log(activeIndex);

		this.swiper.slideTo(activeIndex);
		this.setState({activeIndex});
	}

	render() {
		const {activeIndex} = this.state;

		return (
			<div ref={ref.call(this, 'wrap')} className={CSS.wrap}>
				<div className={CSS.slider}>
					<div className="swiper-container">
						<div className="swiper-wrapper">
							{this.props.team.map(teamMember => {
								return (
									<div key={teamMember.getIn(['fields', 'title'])} className="swiper-slide">
										<div className={CSS.teamMember}>
											<div className={CSS.teamMemberImage}>
												<img src={teamMember.getIn(['fields', 'image', 'src'])}/>
											</div>
											<div className={CSS.teamMemberImageActive}>
												<img src={teamMember.getIn(['fields', 'imageActive', 'src'])}/>
											</div>
											<div className={CSS.teamMemberName}>{teamMember.getIn(['fields', 'title'])}</div>
										</div>
									</div>
								);
							})}
						</div>
						<div className={CSS.nav}>
							<SliderNav/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
