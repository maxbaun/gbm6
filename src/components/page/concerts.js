import React, {Component} from 'react';
import * as ImmutabelProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {fromJS, List} from 'immutable';

import SectionHero from '../sections/sectionHero';
import SectionAbout from '../sections/sectionAbout';
import SectionVideos from '../sections/sectionVideos';
import SectionTeam from '../sections/sectionTeam';
import SectionFaq from '../sections/sectionFaq';
import Cta from '../cta/cta';

import HeroImg from '../../img/Hero-bg-1.png';
import AboutBg from '../../img/About-Bg.jpg';

import {Videos, VideoCategories} from '../../data/videos';
import {Team} from '../../data/team';
import {Faqs} from '../../data/faqs';
import {SiteSettings} from '../../data/siteSettings';

const HeroContent = `
# <span style="color:#F5FF00;">Experience. Music. Together</span>
### Legendary **Event Design & Execution**`;

const AboutHeading = `# <span style="color:#F5FF00;">LEGENDARY EVENTS.</span>
# DELIVERED FROM
# CONCEPT TO MIKE
# DROP.`;

const AboutContent = `You don't just need vendors, you need an event producer -- a team that can help figure out what you need, and then source all the right elements to make it happen.  We're not here to just check off the boxes; we're here to help you figure out exactly what the boxes are.

Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas,`;

const AboutIcons = `icon-production-design:Technical Production Design
icon-management-logistics:Management Logistics
icon-branding-graphics:Branding / Graphics / Media
icon-vendor-source:Vendor Sourcing & Mangement
icon-team:Full-Time Team Support
icon-checklist:100% Customized Experience`;

const VideosHeading = `# MASSIVE SCALE.
# <span style="color:#0091D6;">ZERO LIMITS.</span>
# LEGENDARY EVENTS.`;

const SectionTeamVideo = fromJS({
	videoUrl: 'https://vimeo.com/33517272',
	videoThumbnail: {
		src: AboutBg
	}
});

const SectionTeamHeading = `# <span style="color:#0091D6;">Our TEAM BEHIND</span>
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
			<div>
				<SectionHero
					doubleAngle
					scrollTo="#next"
					scrollColor="#F5FF00"
					imageCss={{
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						backgroundBlendMode: 'multiply',
						backgroundSize: 'cover',
						backgroundPosiition: 'top center'
					}}
					image={fromJS({src: HeroImg})}
					state={this.props.state}
					content={HeroContent}
					onHeroBleedChange={this.handleHeroBleedChange}
				/>
				<SectionAbout
					id="next"
					style={{marginTop: heroBleed * -1, paddingTop: heroBleed}}
					prevSectionBleed={heroBleed}
					backgroundImage={fromJS({src: AboutBg})}
					heading={AboutHeading}
					text={AboutContent}
					state={this.props.state}
					icons={AboutIcons}
					slantDirection="left"
				/>
				<SectionVideos
					videos={Videos}
					videoCategories={VideoCategories}
					heading={VideosHeading}
					state={this.props.state}
					actions={this.props.actions}
					allVideosLink="/"
					allVideosText="Watch All Videos"
				/>
				<SectionTeam
					heading={SectionTeamHeading}
					text={SectionTeamText}
					video={SectionTeamVideo}
					actions={this.props.actions}
					state={this.props.state}
					team={Team}
				/>
				<SectionFaq backgroundImage={fromJS({src: AboutBg})} heading={FaqHeading} faqs={Faqs} state={this.props.state} allFaqLink="/"/>
				<Cta siteSettings={SiteSettings} state={this.props.state}/>
			</div>
		);
	}
}
