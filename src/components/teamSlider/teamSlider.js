import React, {Component} from 'react';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import Swiper from 'swiper';
import {debounce} from 'lodash';
import {connect} from 'react-redux';

import CSS from './teamSlider.module.scss';
import {selectors as stateSelectors} from '../../ducks/state';
import SliderNav from '../sliderNav/sliderNav';
import {ref} from '../../utils/componentHelpers';
import Image from '../common/image';

const TeamSize = 307;
const TeamSizeMobile = 159;

const mapStateToProps = state => ({
	state: stateSelectors.getState(state)
});

class TeamSlider extends Component {
	constructor(props) {
		super(props);

		this.swiper = null;
		this.wrap = null;

		this.updateSlider = debounce(this.updateSlider.bind(this), 300);
	}

	static propTypes = {
		team: ImmutableProptypes.list,
		state: ImmutableProptypes.map.isRequired
	};

	static defaultProps = {
		team: List()
	};

	componentDidMount() {
		this.initSwiper();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.state.getIn(['windowSize', 'width']) !== this.props.state.getIn(['windowSize', 'width'])) {
			this.updateSlider();
		}
	}

	updateSlider() {
		if (this.swiper) {
			this.swiper.destroy();
		}

		this.initSwiper();
	}

	initSwiper() {
		const container = this.wrap.querySelector('.swiper-container');
		const windowWidth = this.props.state.getIn(['windowSize', 'width']);
		const slideSize = windowWidth < 768 ? TeamSizeMobile : TeamSize;

		const options = {
			loop: false,
			direction: 'horizontal',
			spaceBetween: 7,
			slidesPerView: windowWidth / slideSize,
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

export default connect(mapStateToProps)(TeamSlider);
