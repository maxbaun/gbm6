import React, {Component} from 'react';
import * as ImmutabelProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {fromJS, List} from 'immutable';

import SectionHero from '../sections/sectionHero';
import SectionFaq from '../sections/sectionFaq';
import Cta from '../cta/cta';

import HeroImg from '../../img/Hero-bg-1.png';

import {Faqs} from '../../data/faqs';
import {SiteSettings} from '../../data/siteSettings';

const HeroContent = `
# Frequently Asked <span style="color:#0091D6;">Questions</span>
### **Ask Us Anything.** We're Here To Make Your Event Happen
`;

const CtaContent = `# Still Have Questions?
### No problem. Our team is here to answer any questions you might have about your specific event needs. **Contact us today!**`;

export default class FaqPage extends Component {
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
					doubleAngle={false}
					imageCss={{
						backgroundColor: '#000',
						backgroundBlendMode: 'luminosity',
						backgroundSize: 'cover',
						backgroundPosiition: 'top center'
					}}
					image={fromJS({src: HeroImg})}
					state={this.props.state}
					content={HeroContent}
					onHeroBleedChange={this.handleHeroBleedChange}
				/>
				<SectionFaq
					layout="accordion"
					faqs={Faqs}
					state={this.props.state}
					ctaContent={CtaContent}
					ctaLinkUrl="/contact"
					ctaLinkText="Contact Us Today"
				/>
				<Cta siteSettings={SiteSettings} state={this.props.state}/>
			</div>
		);
	}
}
