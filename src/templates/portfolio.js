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
import {unique, notFound} from '../utils/componentHelpers';
import {currentPage} from '../utils/contentfulHelpers';
import {SiteSettings} from '../data/siteSettings';

import SectionHero from '../components/sections/sectionHero';
import SectionCta from '../components/sections/sectionCta';
import SectionPortfolioContent from '../components/sections/sectionPortfolioContent';
import SectionFeaturedEvents from '../components/sections/sectionFeaturedEvents';
import NotFound from '../components/404/404';
import Head from '../components/common/head';

const getSlug = match => {
	let {slug} = match.params;

	return slug;
};

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

		this.state = {
			video: undefined
		};

		this.fetch = unique();
	}

	static propTypes = {
		state: ImmutabelProptypes.map.isRequired,
		videos: ImmutabelProptypes.list,
		match: PropTypes.object.isRequired,
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		location: PropTypes.object.isRequired
	};

	static defaultProps = {
		videos: List()
	};

	static getDerivedStateFromProps(props) {
		const video = currentPage(props.videos, getSlug(props.match));

		return {
			video: video
		};
	}

	componentDidMount() {
		this.getVideo();
	}

	componentDidUpdate(prevProps) {
		// If the slug has changed, get the new page
		if (prevProps.match.params.slug !== this.props.match.params.slug) {
			this.getVideo();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!this.state.video && nextState.video) {
			return true;
		}

		if (this.state.video && nextState.video && nextState.video.getIn(['sys', 'id']) !== this.state.video.getIn(['sys', 'id'])) {
			return true;
		}

		if (nextProps.videos.count() !== this.props.videos.count()) {
			return true;
		}

		if (notFound(this.fetch, nextProps.state)) {
			return true;
		}

		return false;
	}

	getVideo() {
		this.props.actions.videosGet({
			payload: {
				slug: getSlug(this.props.match)
			},
			fetch: this.fetch
		});
	}

	render() {
		const {video} = this.state;

		if (!video && notFound(this.fetch, this.props.state)) {
			return <NotFound/>;
		}

		if (!video) {
			return null;
		}

		return (
			<SectionManager hasCta template="project">
				<Head
					title={video.getIn(['fields', 'title'])}
					description={video.getIn(['fields', 'description'])}
					image={video.getIn(['fields', 'image', '0', 'fields', 'file', 'url'])}
					location={this.props.location}
					url={window.location.href}
				/>
				<SectionHero
					className="heroPortfolio"
					images={video.getIn(['fields', 'images'])}
					video={video.getIn(['fields', 'video'])}
					imageCss={{backgroundSize: 'cover', backgroundPosition: 'center center'}}
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
					videos={this.props.videos.filter(v => v.getIn(['fields', 'slug']) !== this.props.match.params.slug).take(4)}
				/>
				<SectionCta siteSettings={SiteSettings}/>
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
