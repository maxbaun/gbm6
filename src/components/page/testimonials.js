import React, {Component} from 'react';
import * as ImmutabelProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {fromJS, List} from 'immutable';

import SectionHero from '../sections/sectionHero';
import SectionAbout from '../sections/sectionAbout';
import SectionVideos from '../sections/sectionVideos';
import SectionTeam from '../sections/sectionTeam';
import SectionFaq from '../sections/sectionFaq';
import SectionCta from '../sections/sectionCta';
import SectionManager from '../sectionManager/sectionManager';

import HeroImg from '../../img/Hero-bg-1.png';
import AboutBg from '../../img/About-Bg.jpg';

import {Videos, VideoCategories} from '../../data/videos';
import {Team} from '../../data/team';
import {Faqs} from '../../data/faqs';
import {Testimonials} from '../../data/testimonials';
import {SiteSettings} from '../../data/siteSettings';
import SectionTestimonials from '../sections/sectionTestimonials';

const HeroContent = `
# Testimonials
### HEAR **WHAT OTHERS** SAY ABOUT THEIR LEGENDARY EVENTS
`;

export default class TestimonialsPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			heroBleed: 0
		};

		this.handleHeroBleedChange = this.handleHeroBleedChange.bind(this);
	}

	static propTypes = {
		state: ImmutabelProptypes.map.isRequired,
		videos: ImmutabelProptypes.list,
		match: PropTypes.object.isRequired
	};

	static defaultProps = {
		videos: List()
	};

	componentDidMount() {
		console.log('page mount');
	}

	handleHeroBleedChange(heroBleed) {
		this.setState({
			heroBleed
		});
	}

	render() {
		return (
			<SectionManager hasCta template="angle">
				<SectionHero
					imageCss={{
						backgroundColor: '#000E24',
						backgroundBlendMode: 'luminosity',
						backgroundSize: 'cover',
						backgroundPosition: 'center top'
					}}
					image={fromJS({src: HeroImg})}
					state={this.props.state}
					content={HeroContent}
					onHeroBleedChange={this.handleHeroBleedChange}
				/>
				<SectionTestimonials testimonials={Testimonials}/>
				<SectionCta siteSettings={SiteSettings} state={this.props.state}/>
			</SectionManager>
		);
	}
}
