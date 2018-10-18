import React, {Component} from 'react';
import * as ImmutabelProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {fromJS, List} from 'immutable';

import SectionHero from '../sections/sectionHero';
import SectionAbout from '../sections/sectionAbout';
import SectionVideos from '../sections/sectionVideos';

import HeroImg from '../../img/Hero-bg-1.png';
import AboutBg from '../../img/About-Bg.jpg';

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
icon-production-design:Management Logistics
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

const Videos = fromJS([
	{
		title: 'Spring Weekend featuring A Boogie & Cheat Codes',
		slug: 'video-1',
		linkTitle: 'View Details',
		images: [{src: AboutBg}],
		video: 'https://vimeo.com/33517272',
		date: '04.27.2018',
		location: 'University of New Haven',
		talent: 'A Boogie',
		text: `This is some text about the event. What was the type, special execution or reason why GBM6 made this event legendary. This also gives you a location to write more about your involvement if you did only pieces of the event production.

		This can be as long or as short as you wish. These event pages give a great spot for sending people if they request info about a specific event. It also helps SEO as the content on your site in regularly updated with new rich content.

		This should be a great addition to the site structure and provide you the flexability to grow. The rest of this content is jibberish (Vegas-ipsum)  just to fill out the length.

		Ante veer towers the mgm grand mandalay bay fremont street tease tao; payoff the pairs the luxor parlay convention center royal flush! Glitter gluch miracle mile shops fruit loop fashion show mall chateau margaritaville.
		`
	},
	{
		title: 'one world',
		slug: 'video-2',
		linkTitle: 'View Details',
		images: [{src: AboutBg}],
		video: 'https://vimeo.com/33517272',
		date: '05.12.2018',
		location: 'MIT',
		talent: 'A Boogie',
		text: `This is some text about the event. What was the type, special execution or reason why GBM6 made this event legendary. This also gives you a location to write more about your involvement if you did only pieces of the event production.

		This can be as long or as short as you wish. These event pages give a great spot for sending people if they request info about a specific event. It also helps SEO as the content on your site in regularly updated with new rich content.

		This should be a great addition to the site structure and provide you the flexability to grow. The rest of this content is jibberish (Vegas-ipsum)  just to fill out the length.

		Ante veer towers the mgm grand mandalay bay fremont street tease tao; payoff the pairs the luxor parlay convention center royal flush! Glitter gluch miracle mile shops fruit loop fashion show mall chateau margaritaville.
		`
	},
	{
		title: 'Burton US Open',
		slug: 'video-3',
		linkTitle: 'View Details',
		images: [{src: HeroImg}, {src: AboutBg}],
		date: 'Winter 2017',
		location: 'Vermont',
		talent: 'A Boogie',
		text: `This is some text about the event. What was the type, special execution or reason why GBM6 made this event legendary. This also gives you a location to write more about your involvement if you did only pieces of the event production.

		This can be as long or as short as you wish. These event pages give a great spot for sending people if they request info about a specific event. It also helps SEO as the content on your site in regularly updated with new rich content.

		This should be a great addition to the site structure and provide you the flexability to grow. The rest of this content is jibberish (Vegas-ipsum)  just to fill out the length.

		Ante veer towers the mgm grand mandalay bay fremont street tease tao; payoff the pairs the luxor parlay convention center royal flush! Glitter gluch miracle mile shops fruit loop fashion show mall chateau margaritaville.
		`
	},
	{
		title: 'Beats on the Banks featuring metro boomin',
		slug: 'video-4',
		linkTitle: 'View Details',
		images: [{src: HeroImg}, {src: AboutBg}],
		date: '04.13.2018',
		location: 'Rutgers University',
		talent: 'A Boogie',
		text: `This is some text about the event. What was the type, special execution or reason why GBM6 made this event legendary. This also gives you a location to write more about your involvement if you did only pieces of the event production.

		This can be as long or as short as you wish. These event pages give a great spot for sending people if they request info about a specific event. It also helps SEO as the content on your site in regularly updated with new rich content.

		This should be a great addition to the site structure and provide you the flexability to grow. The rest of this content is jibberish (Vegas-ipsum)  just to fill out the length.

		Ante veer towers the mgm grand mandalay bay fremont street tease tao; payoff the pairs the luxor parlay convention center royal flush! Glitter gluch miracle mile shops fruit loop fashion show mall chateau margaritaville.
		`
	},
	{
		title: 'plexapalooza featuring cheat codes',
		slug: 'video-5',
		linkTitle: 'View Details',
		images: [{src: HeroImg}, {src: AboutBg}],
		video: 'https://vimeo.com/33517272',
		date: '02.03.2018',
		location: 'Boston College',
		talent: 'A Boogie',
		text: `This is some text about the event. What was the type, special execution or reason why GBM6 made this event legendary. This also gives you a location to write more about your involvement if you did only pieces of the event production.

		This can be as long or as short as you wish. These event pages give a great spot for sending people if they request info about a specific event. It also helps SEO as the content on your site in regularly updated with new rich content.

		This should be a great addition to the site structure and provide you the flexability to grow. The rest of this content is jibberish (Vegas-ipsum)  just to fill out the length.

		Ante veer towers the mgm grand mandalay bay fremont street tease tao; payoff the pairs the luxor parlay convention center royal flush! Glitter gluch miracle mile shops fruit loop fashion show mall chateau margaritaville.
		`
	},
	{
		title: 'UCONNIC - Behind the Scenes',
		slug: 'video-5',
		linkTitle: 'View Details',
		images: [{src: HeroImg}, {src: AboutBg}],
		video: 'https://vimeo.com/33517272',
		date: '04.12.2018',
		location: 'UCONN',
		talent: 'A Boogie',
		text: `This is some text about the event. What was the type, special execution or reason why GBM6 made this event legendary. This also gives you a location to write more about your involvement if you did only pieces of the event production.

		This can be as long or as short as you wish. These event pages give a great spot for sending people if they request info about a specific event. It also helps SEO as the content on your site in regularly updated with new rich content.

		This should be a great addition to the site structure and provide you the flexability to grow. The rest of this content is jibberish (Vegas-ipsum)  just to fill out the length.

		Ante veer towers the mgm grand mandalay bay fremont street tease tao; payoff the pairs the luxor parlay convention center royal flush! Glitter gluch miracle mile shops fruit loop fashion show mall chateau margaritaville.
		`
	},
	{
		title: 'Christmas At The Hall',
		slug: 'video-5',
		linkTitle: 'View Details',
		images: [{src: HeroImg}, {src: AboutBg}],
		video: 'https://vimeo.com/33517272',
		date: 'December 2017',
		location: 'Seton Hall',
		talent: 'A Boogie',
		text: `This is some text about the event. What was the type, special execution or reason why GBM6 made this event legendary. This also gives you a location to write more about your involvement if you did only pieces of the event production.

		This can be as long or as short as you wish. These event pages give a great spot for sending people if they request info about a specific event. It also helps SEO as the content on your site in regularly updated with new rich content.

		This should be a great addition to the site structure and provide you the flexability to grow. The rest of this content is jibberish (Vegas-ipsum)  just to fill out the length.

		Ante veer towers the mgm grand mandalay bay fremont street tease tao; payoff the pairs the luxor parlay convention center royal flush! Glitter gluch miracle mile shops fruit loop fashion show mall chateau margaritaville.
		`
	},
	{
		title: 'Astrology Spring Formal',
		slug: 'video-5',
		linkTitle: 'View Details',
		images: [{src: HeroImg}, {src: AboutBg}],
		video: 'https://vimeo.com/33517272',
		date: '04.28.17',
		location: 'Sarah Lawrence College',
		talent: 'A Boogie',
		text: `This is some text about the event. What was the type, special execution or reason why GBM6 made this event legendary. This also gives you a location to write more about your involvement if you did only pieces of the event production.

		This can be as long or as short as you wish. These event pages give a great spot for sending people if they request info about a specific event. It also helps SEO as the content on your site in regularly updated with new rich content.

		This should be a great addition to the site structure and provide you the flexability to grow. The rest of this content is jibberish (Vegas-ipsum)  just to fill out the length.

		Ante veer towers the mgm grand mandalay bay fremont street tease tao; payoff the pairs the luxor parlay convention center royal flush! Glitter gluch miracle mile shops fruit loop fashion show mall chateau margaritaville.
		`
	}
]);

const VideoCategories = fromJS([
	{
		fields: {
			title: 'Category 1',
			slug: 'category-1'
		}
	},
	{
		fields: {
			title: 'Category 2',
			slug: 'category-2'
		}
	},
	{
		fields: {
			title: 'Category 3',
			slug: 'category-3'
		}
	}
]);

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
					scrollColor="#0091D6"
					imageCss={{
						backgroundColor: '#0091D6',
						backgroundBlendMode: 'luminosity',
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
					counters={AboutCounters}
					slantDirection="left"
				/>
				<SectionVideos
					videos={Videos}
					videoCategories={VideoCategories}
					heading={VideosHeading}
					state={this.props.state}
					activeCategory={this.props.match.params.slug}
					actions={this.props.actions}
				/>
			</div>
		);
	}
}
