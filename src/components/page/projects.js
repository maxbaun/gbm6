import React, {Component} from 'react';
import * as ImmutabelProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {fromJS, List} from 'immutable';

import SectionHero from '../sections/sectionHero';
import SectionVideos from '../sections/sectionVideos';
import SectionFaq from '../sections/sectionFaq';
import SectionCta from '../sections/sectionCta';
import SectionFeatured from '../sections/sectionFeatured';
import SectionManager from '../sectionManager/sectionManager';

import HeroImg from '../../img/Hero-bg-1.png';
import AboutBg from '../../img/About-Bg.jpg';

import {Videos, VideoCategories} from '../../data/videos';
import {Faqs} from '../../data/faqs';
import {SiteSettings} from '../../data/siteSettings';

const HeroContent = `
# Let's Build <span style="color:#F5FF00;">Awesome</span> Together
### **BUILD ANYTHING. BUILD EVERYTHING.** LEGEDARY EVENT DESIGN & EXECUTION`;

const VideosHeading = `# <span style="color:#0091D6;">Special Projects</span>
# & Premier EVENTS.`;

const FaqHeading = `# Frequently
# Asked <span style="color:#0091D6;">Questions</span>`;

const FeaturedHeading = '# <span style="color:#0091D6;">Featured</span> Events';

const FeaturedImages = fromJS([
	{
		src: 'https://via.placeholder.com/230x96/0091D6'
	},
	{
		src: 'https://via.placeholder.com/230x96/F5FF00'
	},
	{
		src: 'https://via.placeholder.com/135x149/0091D6'
	},
	{
		src: 'https://via.placeholder.com/230x96/F5FF00'
	}
]);

export default class ProjectsPage extends Component {
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
			<SectionManager hasCta template="angle">
				<SectionHero
					doubleAngle
					imageCss={{
						backgroundColor: '#0091D6',
						backgroundBlendMode: 'luminosity',
						backgroundSize: 'cover',
						backgroundPosition: 'center top'
					}}
					image={fromJS({src: HeroImg})}
					state={this.props.state}
					content={HeroContent}
				/>
				<SectionVideos
					showCategories={false}
					paginate={false}
					videos={Videos}
					videoCategories={List([VideoCategories.get(0)])}
					heading={VideosHeading}
					state={this.props.state}
					actions={this.props.actions}
					allVideosLink="/"
					allVideosText="Watch All Videos"
				/>
				<SectionFeatured heading={FeaturedHeading} images={FeaturedImages}/>
				<SectionFaq backgroundImage={fromJS({src: AboutBg})} heading={FaqHeading} faqs={Faqs} state={this.props.state} allFaqLink="/"/>
				<SectionCta siteSettings={SiteSettings} state={this.props.state}/>
			</SectionManager>
		);
	}
}
