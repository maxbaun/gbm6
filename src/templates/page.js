import React, {Component, Fragment} from 'react';
import * as ImmutabelProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {List, fromJS} from 'immutable';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {selectors as pageSelectors, actions as pageActions} from '../ducks/pages';
import {selectors as stateSelectors, actions as stateActions} from '../ducks/state';

import SectionManager from '../components/sectionManager/sectionManager';
import {unique, notFound} from '../utils/componentHelpers';
import {currentPage} from '../utils/contentfulHelpers';

import SectionHero from '../components/sections/sectionHero';
import SectionAbout from '../components/sections/sectionAbout';
import SectionVideos from '../components/sections/sectionVideos';
import SectionTeam from '../components/sections/sectionTeam';
import SectionFaq from '../components/sections/sectionFaq';
import SectionTestimonials from '../components/sections/sectionTestimonials';
import SectionCta from '../components/sections/sectionCta';
import SectionFeatured from '../components/sections/sectionFeatured';
import Head from '../components/common/head';
import NotFound from '../components/404/404';

const getSlug = match => {
	let {slug} = match.params;
	const isHome = !slug || slug === '';

	if (isHome) {
		return 'index';
	}

	return slug;
};

const mapStateToProps = state => ({
	pages: pageSelectors.getPages(state),
	state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		{
			...pageActions,
			...stateActions
		},
		dispatch
	)
});

class PageTemplate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: undefined
		};

		this.fetch = unique();

		this.scrollChecker = null;
		this.scrollRef = null;

		this.getSection = this.getSection.bind(this);
	}

	static propTypes = {
		state: ImmutabelProptypes.map.isRequired,
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		pages: ImmutabelProptypes.list,
		actions: PropTypes.objectOf(PropTypes.func).isRequired
	};

	static defaultProps = {
		pages: List()
	};

	static getDerivedStateFromProps(props) {
		const page = currentPage(props.pages, getSlug(props.match));

		return {
			page: page
		};
	}

	componentDidMount() {
		this.getPage();
	}

	componentDidUpdate(prevProps) {
		// If the slug has changed, get the new page
		if (prevProps.match.params.slug !== this.props.match.params.slug) {
			this.getPage();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!this.state.page && nextState.page) {
			return true;
		}

		if (this.state.page && nextState.page && nextState.page.getIn(['sys', 'id']) !== this.state.page.getIn(['sys', 'id'])) {
			return true;
		}

		if (notFound(this.fetch, nextProps.state)) {
			return true;
		}

		if (nextProps.match.params.slug !== this.props.match.params.slug) {
			return true;
		}

		return false;
	}

	getPage() {
		this.props.actions.pagesGet({
			payload: {
				slug: getSlug(this.props.match)
			},
			fetch: this.fetch
		});
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
					hasOverlay={fields.get('hasOverlay')}
					overlayColor={fields.get('overlayColor')}
					overlayOpacity={fields.get('overlayOpacity')}
					content={fields.get('content')}
					scrollTo={fields.get('scrollTo')}
					scrollColor={fields.get('scrollColor')}
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
				/>
			);
		}

		if (sectionType === 'sectionVideos') {
			return (
				<SectionVideos
					key={index}
					id={fields.get('id')}
					heading={fields.get('heading')}
					allVideosLink={fields.get('allVideosLink')}
					allVideosText={fields.get('allVideosText')}
					showCategories={fields.get('showCategories')}
					categoryAlign={fields.get('categoryAlign')}
					categories={fields.get('categories')}
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
					allCategoriesText={fields.get('allCategoriesText')}
					ctaContent={fields.get('ctaContent')}
					ctaLinkUrl={fields.get('ctaLinkUrl')}
					ctaLinkText={fields.get('ctaLinkText')}
					faqs={fields.get('questions')}
					layout={fields.get('layout')}
				/>
			);
		}

		if (sectionType === 'sectionFeatured') {
			return <SectionFeatured key={index} heading={fields.get('heading')} images={fields.get('images')}/>;
		}

		if (sectionType === 'sectionTestimonials') {
			return <SectionTestimonials key={index} testimonials={fields.get('testimonials')}/>;
		}

		return null;
	}

	render() {
		const {page} = this.state;

		if (notFound(this.fetch, this.props.state)) {
			return <NotFound/>;
		}

		if (!page) {
			return null;
		}

		const sections = page.getIn(['fields', 'sections']).map(this.getSection);
		const hasCta = page.getIn(['fields', 'hasCta']);

		return (
			<Fragment>
				<Head
					title={page.getIn(['fields', 'title'])}
					description={page.getIn(['fields', 'description'])}
					image={page.getIn(['fields', 'image', 'fields', 'file', 'url'])}
					location={this.props.location}
					url={window.location.href}
				/>
				<SectionManager hasCta={hasCta} template={page.getIn(['fields', 'pageLayout'])}>
					{sections.toJS()}
					{hasCta ? <SectionCta/> : null}
				</SectionManager>
			</Fragment>
		);
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(PageTemplate)
);
