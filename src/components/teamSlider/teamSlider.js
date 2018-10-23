import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {Map, List} from 'immutable';
import Swiper from 'swiper';

import CSS from './teamSlider.module.scss';
import SliderNav from '../sliderNav/sliderNav';
import {ref, windowWidthChange, click, debounce} from '../../utils/componentHelpers';
import {responsive} from '../../constants';
import Image from '../common/image';

const TeamSize = 307;
const TeamSizeMobile = 159;
const TeamSpacing = 7;

export default class TeamSlider extends Component {
	constructor(props) {
		super(props);

		this.swiper = null;
		this.wrap = null;

		this.updateSlider = debounce(this.updateSlider.bind(this), 300);
	}

	static propTypes = {
		team: ImmutableProptypes.list
	};

	static defaultProps = {
		team: List()
	};

	componentDidMount() {
		this.initSwiper();

		window.addEventListener('resize', this.updateSlider);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateSlider);
	}

	updateSlider() {
		this.initSwiper();
	}

	initSwiper() {
		const container = this.wrap.querySelector('.swiper-container');
		const slideSize = window.innerWidth < responsive.collapse ? TeamSizeMobile : TeamSize;

		const options = {
			loop: false,
			direction: 'horizontal',
			spaceBetween: 7,
			slidesPerView: this.wrap.offsetWidth / slideSize,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		};

		this.swiper = new Swiper(container, options);
	}

	render() {
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
												<Image image={teamMember.getIn(['fields', 'image'])} width={300}/>
											</div>
											<div className={CSS.teamMemberImageActive}>
												<Image image={teamMember.getIn(['fields', 'imageActive'])} width={300}/>
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
