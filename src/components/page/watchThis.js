import React, {Component} from 'react';
import * as ImmutabelProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {fromJS, List} from 'immutable';

import SectionHero from '../sections/sectionHero';
import SectionVideos from '../sections/sectionVideos';
import Cta from '../cta/cta';

import HeroImg from '../../img/Hero-bg-1.png';

import {Videos, VideoCategories} from '../../data/videos';
import {SiteSettings} from '../../data/siteSettings';

const HeroContent = `
# <span style="color:white;text-shadow:6px 6px 25px rgba(0,145,214,0.7);">18 Years of </span>
# <span style="color:#C5FC01;text-shadow:6px 6px 25px rgba(0,145,214,0.7);">Making People Happy</span>
### Legendary **Event Design & Execution**
`;

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
				<SectionVideos
					id="next"
					videos={Videos}
					videoCategories={VideoCategories}
					state={this.props.state}
					activeCategory={this.props.match.params.slug}
					actions={this.props.actions}
					categoryAlign="center"
				/>
				<Cta siteSettings={SiteSettings} state={this.props.state}/>
			</div>
		);
	}
}
