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
import {unique, ScrollToHelper, isLoading} from '../utils/componentHelpers';
import {currentPage} from '../utils/contentfulHelpers';
import {SiteSettings} from '../data/siteSettings';

import SectionHero from '../components/sections/sectionHero';
import SectionCta from '../components/sections/sectionCta';
import SectionPortfolioContent from '../components/sections/sectionPortfolioContent';
import SectionFeaturedEvents from '../components/sections/sectionFeaturedEvents';
import NotFound from '../components/404/404';
import Head from '../components/common/head';

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
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		location: PropTypes.object.isRequired
	};

	static defaultProps = {
		videos: List()
	};

	componentDidMount() {
		this.getVideo();
		this.locationChanged();
	}

	componentDidUpdate(prevProps) {
		// If the slug has changed, get the new page
		if (prevProps.match.params.slug !== this.props.match.params.slug) {
			this.getVideo();
			this.locationChanged();
		} else if (prevProps.location.hash !== this.props.location.hash) {
			this.locationChanged();
		}
	}

	locationChanged() {
		if (!this.props.location.hash || this.props.location.hash === '') {
			window.scrollTo(0, 0);
			return;
		}

		this.scrollChecker = setInterval(() => {
			const currentVideo = this.currentVideo();

			if (currentVideo && !currentVideo.isEmpty()) {
				this.checkTargetElem();
			}
		}, 50);
	}

	checkTargetElem() {
		clearInterval(this.scrollChecker);

		if (!this.props.location.hash) {
			return;
		}

		this.scrollChecker = setInterval(() => {
			if (!this.props.location.hash) {
				this.scrollToHash();
			}
			const targetElem = document.querySelector(this.props.location.hash);

			if (targetElem) {
				this.scrollToHash(targetElem);
			}
		}, 50);
	}

	scrollToHash(target) {
		clearInterval(this.scrollChecker);

		if (!target) {
			return;
		}

		this.scrollRef = new ScrollToHelper(target, {
			duration: 500,
			container: window
		});
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

		if (!video && !isLoading(this.fetch, this.props.state)) {
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
					state={this.props.state}
				/>
				<SectionFeaturedEvents
					title="More Legendary Events"
					actions={this.props.actions}
					state={this.props.state}
					videos={this.props.videos.filter(v => v.getIn(['fields', 'slug']) !== this.props.match.params.slug).take(4)}
				/>
				<SectionCta siteSettings={SiteSettings} state={this.props.state} actions={this.props.actions}/>
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
