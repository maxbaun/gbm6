import React, {Component} from 'react';
import * as ImmutabelProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {selectors as videoSelectors, actions as videoActions} from '../ducks/videos';
import {selectors as stateSelectors, actions as stateActions} from '../ducks/state';

import SectionManager from '../components/sectionManager/sectionManager';
import {unique} from '../utils/componentHelpers';
import {currentPage} from '../utils/contentfulHelpers';
import {SiteSettings} from '../data/siteSettings';

import SectionHero from '../components/sections/sectionHero';
import SectionAbout from '../components/sections/sectionAbout';
import SectionVideos from '../components/sections/sectionVideos';
import SectionTeam from '../components/sections/sectionTeam';
import SectionFaq from '../components/sections/sectionFaq';
import SectionTestimonials from '../components/sections/sectionTestimonials';

import SectionCta from '../components/sections/sectionCta';
import SectionPortfolioContent from '../components/sections/sectionPortfolioContent';
import SectionFeaturedEvents from '../components/sections/sectionFeaturedEvents';

const mapStateToProps = state => ({
	videos: videoSelectors.getVideos(state),
	state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		{
			...videoActions,
			...stateActions
		},
		dispatch
	)
});

class PortfolioTemplate extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();

		this.currentVideo = this.currentVideo.bind(this);
	}

	static propTypes = {
		state: ImmutabelProptypes.map.isRequired,
		videos: ImmutabelProptypes.list,
		match: PropTypes.object.isRequired,
		actions: PropTypes.objectOf(PropTypes.func).isRequired
	};

	static defaultProps = {
		videos: List()
	};

	componentDidMount() {
		this.getVideo();
	}

	componentDidUpdate(prevProps) {
		// If the slug has changed, get the new page
		if (prevProps.match.params.slug !== this.props.match.params.slug) {
			this.getVideo();
		}
	}

	getVideo() {
		this.props.actions.videosGet({
			payload: {
				slug: this.getSlug()
			},
			fetch: this.fetch
		});
	}

	getSlug() {
		let {slug} = this.props.match.params;

		return slug;
	}

	currentVideo() {
		return currentPage(this.props.videos, this.getSlug());
	}

	render() {
		const video = this.currentVideo();

		if (!video) {
			return null;
		}

		return (
			<SectionManager hasCta template="project">
				<SectionHero
					className="heroPortfolio"
					images={video.getIn(['fields', 'images'])}
					video={video.getIn(['fields', 'video'])}
					imageCss={{backgroundSize: 'cover', backgroundPosition: 'top center'}}
					state={this.props.state}
					actions={this.props.actions}
				/>
				<SectionPortfolioContent
					title={video.getIn(['fields', 'title'])}
					content={video.getIn(['fields', 'text'])}
					date={video.getIn(['fields', 'date'])}
					location={video.getIn(['fields', 'location'])}
					talent={video.getIn(['fields', 'talent'])}
				/>
				<SectionFeaturedEvents
					title="More Legendary Events"
					actions={this.props.actions}
					state={this.props.state}
					videos={this.props.videos.take(4)}
				/>
				<SectionCta siteSettings={SiteSettings} state={this.props.state}/>
			</SectionManager>
		);
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(PortfolioTemplate)
);