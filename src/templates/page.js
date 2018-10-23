import React, {Component} from 'react';
import * as ImmutabelProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {selectors as pageSelectors, actions as pageActions} from '../ducks/pages';
import {selectors as videoSelectors} from '../ducks/videos';
import {selectors as stateSelectors, actions as stateActions} from '../ducks/state';

import SectionManager from '../components/sectionManager/sectionManager';
import {unique} from '../utils/componentHelpers';
import {currentPage} from '../utils/contentfulHelpers';

import SectionHero from '../components/sections/sectionHero';
import SectionAbout from '../components/sections/sectionAbout';
import SectionVideos from '../components/sections/sectionVideos';

const mapStateToProps = state => ({
	pages: pageSelectors.getPages(state),
	videos: videoSelectors.getVideos(state),
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

		this.fetch = unique();

		this.getSection = this.getSection.bind(this);
	}

	static propTypes = {
		state: ImmutabelProptypes.map.isRequired,
		videos: ImmutabelProptypes.list,
		match: PropTypes.object.isRequired,
		pages: ImmutabelProptypes.list
	};

	static defaultProps = {
		videos: List(),
		pages: List()
	};

	componentDidMount() {
		this.getPage();
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
					image={fields.get('image')}
					imageCss={fields.get('imageCss') ? fields.get('imageCss').toJS() : {}}
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

		return <div key={index}>test</div>;
	}

	render() {
		const page = this.currentPage();

		if (!page) {
			return null;
		}

		const sections = page.getIn(['fields', 'sections']).map(this.getSection);

		return (
			<SectionManager hasCta template={page.getIn(['fields', 'pageLayout'])}>
				{sections.toJS()}
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
