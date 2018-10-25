import React, {Component} from 'react';
import * as ImmutabelProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {List, fromJS} from 'immutable';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {selectors as pageSelectors, actions as pageActions} from '../ducks/pages';
import {selectors as videoSelectors} from '../ducks/videos';
import {selectors as stateSelectors, actions as stateActions} from '../ducks/state';
import {actions as formActions, selectors as formSelectors} from '../ducks/forms';

import SectionManager from '../components/sectionManager/sectionManager';
import {unique, ScrollToHelper, noop} from '../utils/componentHelpers';
import {currentPage} from '../utils/contentfulHelpers';
import {SiteSettings} from '../data/siteSettings';
import SectionHero from '../components/sections/sectionHero';
import SectionAbout from '../components/sections/sectionAbout';
import SectionVideos from '../components/sections/sectionVideos';
import SectionTeam from '../components/sections/sectionTeam';
import SectionFaq from '../components/sections/sectionFaq';
import SectionTestimonials from '../components/sections/sectionTestimonials';

import SectionCta from '../components/sections/sectionCta';

const mapStateToProps = state => ({
	pages: pageSelectors.getPages(state),
	videos: videoSelectors.getVideos(state),
	state: stateSelectors.getState(state),
	forms: formSelectors.getForms(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		{
			...pageActions,
			...stateActions,
			...formActions
		},
		dispatch
	)
});

class PageTemplate extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();

		this.scrollChecker = null;
		this.scrollRef = null;

		this.getSection = this.getSection.bind(this);
	}

	static propTypes = {
		state: ImmutabelProptypes.map.isRequired,
		videos: ImmutabelProptypes.list,
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		pages: ImmutabelProptypes.list,
		actions: PropTypes.objectOf(PropTypes.func).isRequired
	};

	static defaultProps = {
		videos: List(),
		pages: List()
	};

	componentDidMount() {
		window.scrollTo(0, 0);
		this.getPage();

		document.addEventListener('readystatechange', () => (document.readyState === 'complete' ? this.checkScroll() : noop()));
	}

	componentDidUpdate(prevProps) {
		// If the slug has changed, get the new page
		if (prevProps.match.params.slug !== this.props.match.params.slug) {
			window.scrollTo(0, 0);
			this.getPage();
			this.checkScroll();
		} else if (prevProps.location.hash !== this.props.location.hash) {
			window.scrollTo(0, 0);
			this.checkScroll();
		}
	}

	componentWillUnmount() {
		document.removeEventListener('readystatechange');
	}

	getPage() {
		this.props.actions.pagesGet({
			payload: {
				slug: this.getSlug()
			},
			fetch: this.fetch
		});
	}

	getSlug() {
		let {slug} = this.props.match.params;
		const isHome = !slug || slug === '';

		if (isHome) {
			return 'index';
		}

		return slug;
	}

	checkScroll() {
		if (!this.props.location.hash || this.props.location.hash === '') {
			return;
		}

		this.scrollChecker = setInterval(() => {
			const currentPage = this.currentPage();

			if (currentPage && !currentPage.isEmpty()) {
				this.checkTargetElem();
			}
		}, 100);
	}

	checkTargetElem() {
		clearInterval(this.scrollChecker);

		this.scrollChecker = setInterval(() => {
			const targetElem = document.querySelector(this.props.location.hash);

			if (targetElem) {
				this.scrollToHash(targetElem);
			}
		}, 100);
	}

	scrollToHash(target) {
		clearInterval(this.scrollChecker);

		setTimeout(() => {
			this.scrollRef = new ScrollToHelper(target, {
				duration: 800,
				container: window
			});
		}, 150);
	}

	currentPage() {
		return currentPage(this.props.pages, this.getSlug());
	}

	getSection(section, index) {
		const sectionType = section.getIn(['sys', 'contentType', 'sys', 'id']);
		const fields = section.get('fields');

		if (sectionType === 'sectionHero') {
			return (
				<SectionHero
					key={index}
					images={List([fields.get('image')])}
					imageCss={fields.get('imageCss') ? fields.get('imageCss').toJS() : {}}
					content={fields.get('content')}
					scrollTo={fields.get('scrollTo')}
					scrollColor={fields.get('scrollColor')}
					state={this.props.state}
					actions={this.props.actions}
				/>
			);
		}

		if (sectionType === 'sectionAbout') {
			return (
				<SectionAbout
					key={index}
					id={fields.get('id')}
					heading={fields.get('heading')}
					text={fields.get('text')}
					image={fields.get('image')}
					imageCss={fields.get('imageCss') ? fields.get('imageCss').toJS() : {}}
					icons={fields.get('icons')}
					counters={fields.get('counters') || ''}
					state={this.props.state}
				/>
			);
		}

		if (sectionType === 'sectionVideos') {
			return (
				<SectionVideos
					key={index}
					heading={fields.get('heading')}
					allVideosLink={fields.get('allVideosLink')}
					showCategories={fields.get('showCategories')}
					categoryAlign={fields.get('categoryAlign')}
					categories={fields.get('categories')}
					state={this.props.state}
					actions={this.props.actions}
					videos={this.props.videos}
				/>
			);
		}

		if (sectionType === 'sectionTeam') {
			return (
				<SectionTeam
					key={index}
					id={fields.get('id')}
					heading={fields.get('heading')}
					text={fields.get('text')}
					actions={this.props.actions}
					state={this.props.state}
					team={fields.get('teamMembers')}
					video={fromJS({videoUrl: fields.get('videoUrl'), videoThumbnail: fields.get('videoThumbnail')})}
				/>
			);
		}

		if (sectionType === 'sectionFaq') {
			return (
				<SectionFaq
					key={index}
					heading={fields.get('heading')}
					backgroundImage={fields.get('backgroundImage')}
					allFaqLinkUrl={fields.get('allFaqLinkUrl')}
					allFaqLinkText={fields.get('allFaqLinkText')}
					ctaContent={fields.get('ctaContent')}
					ctaLinkUrl={fields.get('ctaLinkUrl')}
					ctaLinkText={fields.get('ctaLinkText')}
					faqs={fields.get('questions')}
					layout={fields.get('layout')}
				/>
			);
		}

		if (sectionType === 'sectionTestimonials') {
			return <SectionTestimonials key={index} testimonials={fields.get('testimonials')}/>;
		}

		return null;
	}

	render() {
		const page = this.currentPage();

		if (!page) {
			return null;
		}

		const sections = page.getIn(['fields', 'sections']).map(this.getSection);
		const hasCta = page.getIn(['fields', 'hasCta']);

		return (
			<SectionManager hasCta={hasCta} template={page.getIn(['fields', 'pageLayout'])}>
				{sections.toJS()}
				{hasCta ? <SectionCta siteSettings={SiteSettings} state={this.props.state} actions={this.props.actions}/> : null}
			</SectionManager>
		);
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(PageTemplate)
);
