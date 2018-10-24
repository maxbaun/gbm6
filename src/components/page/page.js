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
import {SiteSettings} from '../../data/siteSettings';

const HeroContent = `
# <span style="color:white;text-shadow:6px 6px 25px rgba(0,145,214,0.7);">18 Years of </span>
# <span style="color:#C5FC01;text-shadow:6px 6px 25px rgba(0,145,214,0.7);">Making People Happy</span>
### Legendary **Event Design & Execution**
`;

const AboutHeading = `
# <span style="color:white;">We're About</span>
# <span style="color:#0091D6;">Making People Happy</span>, Through Legendary Events.
`;

const AboutContent = `
Shared experiences are ESSENTIAL -- but it’s getting harder to engage people through events when they’ve got unprecedented access to friends, music, and information online.

Live events need to evolve to stay competitive. We’re all about creating experiences that are relevant, authentic, emotional, and valuable -- within the landscape of an increasingly capable culture.
`;

const AboutIcons = `icon-production-design:Technical Production Design
icon-management-logistics:Management Logistics
icon-branding-graphics:Branding / Graphics / Media
icon-vendor-source:Vendor Sourcing & Mangement
icon-team:Full-Time Team Support
icon-checklist:100% Customized Experience`;

const AboutCounters = `95:%:Repeat Bookings
10::Branded Tours
300:+:Major Concerts`;

const VideosHeading = `# MASSIVE SCALE.
# <span style="color:#0091D6;">ZERO LIMITS.</span>
# LEGENDARY EVENTS.`;

const SectionTeamVideo = fromJS({
	videoUrl: 'https://vimeo.com/33517272',
	videoThumbnail: {
		src: AboutBg
	}
});

const SectionTeamHeading = `# <span style="color:#0091D6;">THE TEAM BEHIND</span>
# THE MISSION`;

const SectionTeamText =
	'We’re here to make your event legendary, and it’s vital that we have the right people on board. We’ve got a full-time core staff to support you, and an arsenal of experts to help execute. From strategic design to the after-movie, we’ve got your back every step of the way.';

const FaqHeading = `# Frequently
# Asked <span style="color:#0091D6;">Questions</span>`;

export default class Page extends Component {
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
		const {heroBleed} = this.state;

		return (
			<SectionManager hasCta template="chevron">
				<SectionHero
					scrollTo="#next"
					scrollColor="#0091D6"
					imageCss={{
						backgroundColor: '#0091D6',
						backgroundBlendMode: 'luminosity',
						backgroundSize: 'cover',
						backgroundPosition: 'center top'
					}}
					image={fromJS({src: HeroImg})}
					content={HeroContent}
				/>
				<SectionAbout
					id="next"
					prevSectionBleed={heroBleed}
					backgroundImage={fromJS({src: AboutBg})}
					heading={AboutHeading}
					text={AboutContent}
					state={this.props.state}
					icons={AboutIcons}
					counters={AboutCounters}
					slantDirection="left"
				/>
				<SectionVideos
					videos={Videos}
					videoCategories={VideoCategories}
					heading={VideosHeading}
					state={this.props.state}
					actions={this.props.actions}
					allVideosLink="/"
				/>
				<SectionTeam heading={SectionTeamHeading} text={SectionTeamText} video={SectionTeamVideo} actions={this.props.actions} team={Team}/>
				<SectionFaq backgroundImage={fromJS({src: AboutBg})} heading={FaqHeading} faqs={Faqs} allFaqLink="/"/>
				<SectionCta siteSettings={SiteSettings} state={this.props.state}/>
			</SectionManager>
		);
	}
}
