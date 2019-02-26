import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';

import CSS from './sectionVideos.module.scss';
import {selectors as videoSelectors} from '../../ducks/videos';
import HeadingBrand from '../headingBrand/headingBrand';
import {click} from '../../utils/componentHelpers';
import VideoGrid from '../videoGrid/videoGrid';
import {videosPerPage} from '../../constants';
import SectionLines from '../common/sectionLines';

const mapStateToProps = state => ({
	videos: videoSelectors.getVideos(state)
});

class SectionVideos extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeCategory: -1,
			page: 1,
			perGroup: videosPerPage
		};

		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleLoadMore = this.handleLoadMore.bind(this);
		this.hasMore = this.hasMore.bind(this);
		this.getActiveVideos = this.getActiveVideos.bind(this);
	}

	static propTypes = {
		state: ImmutableProptypes.map,
		heading: PropTypes.string,
		videos: ImmutableProptypes.list,
		categories: ImmutableProptypes.list,
		allVideosLink: PropTypes.string,
		allVideosText: PropTypes.string,
		allCategoriesText: PropTypes.string,
		categoryAlign: PropTypes.oneOf(['left', 'center']),
		id: PropTypes.string,
		showCategories: PropTypes.bool
	};

	static defaultProps = {
		state: Map(),
		heading: null,
		videos: List(),
		categories: List(),
		allVideosLink: null,
		allVideosText: 'All Videos',
		categoryAlign: 'left',
		allCategoriesText: 'All',
		id: null,
		showCategories: true
	};

	static getDerivedStateFromProps(props, state) {
		return {
			activeCategory: props.showCategories ? state.activeCategory : 0
		};
	}

	handleCategoryChange(activeCategory) {
		this.setState(prevState => {
			return {
				activeCategory,
				perGroup: videosPerPage * prevState.page
			};
		});
	}

	handleLoadMore() {
		this.getNextVideos(this.state.page + 1);
	}

	hasMore() {
		const activeVideos = this.getActiveVideos();

		return activeVideos.count() > this.state.page * videosPerPage;
	}

	getNextVideos(page) {
		this.setState({page});
	}

	getPaginatedVideos() {
		return this.getActiveVideos().take(this.state.page * videosPerPage);
	}

	getActiveVideos() {
		if (this.props.categories.count() === 0 || this.props.videos.count() === 0) {
			return List();
		}

		const allVideos = this.getAllActiveVideos();

		if (this.state.activeCategory === -1) {
			return allVideos;
		}

		const activeCategory = this.props.categories.find((cat, index) => index === this.state.activeCategory);

		return allVideos.reduce((list, video) => {
			if (this.videoHasCategory(video, activeCategory)) {
				return list.push(video);
			}

			return list;
		}, List());
	}

	getAllActiveVideos() {
		if (this.props.categories.count() === 0 || this.props.videos.count() === 0) {
			return List();
		}

		return this.props.videos.reduce((list, video) => {
			return this.props.categories.reduce((innerList, category) => {
				const existingIndex = innerList.findIndex(v => v.getIn(['sys', 'id']) === video.getIn(['sys', 'id']));

				if (existingIndex > -1) {
					return innerList;
				}

				return this.videoHasCategory(video, category) ? innerList.push(video) : innerList;
			}, list);
		}, List());
	}

	videoHasCategory(video, category) {
		let hasCategory = false;

		if (!video.getIn(['fields', 'categories'])) {
			return false;
		}

		video.getIn(['fields', 'categories']).forEach(cat => {
			if (cat.getIn(['fields', 'slug']) === category.getIn(['fields', 'slug'])) {
				hasCategory = true;
			}
		});

		return hasCategory;
	}

	render() {
		const {id, heading, categories, allVideosText, allVideosLink, categoryAlign, showCategories} = this.props;

		const paginatedVideos = this.getPaginatedVideos();
		const hasMore = this.hasMore();

		return (
			<div data-section id={id} className={CSS.section}>
				<div data-clip-target>
					<SectionLines/>
					<div className={CSS.inner}>
						<div className="container">
							<div className={CSS.content}>
								<div className="row align-items-end">
									{heading && heading !== '' ? (
										<div className="col-md-6 col-lg-6">
											<div className={CSS.heading}>
												<HeadingBrand heading={this.props.heading} headingClass={CSS.videoHeading}/>
											</div>
										</div>
									) : null}

									{allVideosLink ? (
										<div className="col-md-5 col-lg-5 offset-lg-1">
											<Link to={allVideosLink} className={CSS.allVideosLink}>
												{allVideosText}
											</Link>
										</div>
									) : null}
								</div>
							</div>
						</div>
						{showCategories ? (
							<ul className={CSS.categories} data-align={categoryAlign}>
								<li className={CSS.category}>
									<div
										className={this.state.activeCategory === -1 ? CSS.categoryLinkActive : CSS.categoryLink}
										onClick={click(this.handleCategoryChange, -1)}
									>
										{this.props.allCategoriesText}
									</div>
								</li>
								{categories.map((category, index) => {
									return (
										<li key={category.getIn(['fields', 'slug'])} className={CSS.category}>
											<div
												className={this.state.activeCategory === index ? CSS.categoryLinkActive : CSS.categoryLink}
												onClick={click(this.handleCategoryChange, index)}
											>
												{category.getIn(['fields', 'title'])}
											</div>
										</li>
									);
								})}
							</ul>
						) : null}
						<div className={CSS.videos}>
							<VideoGrid videos={paginatedVideos} perGroup={this.state.perGroup}/>
						</div>
						{paginatedVideos && paginatedVideos.count() > 0 && hasMore ? (
							<div className={CSS.loadMoreBtn}>
								<div className={CSS.btn}>
									<button type="button" className="btn btn-outline" onClick={this.handleLoadMore}>
										Load more videos
									</button>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(SectionVideos);
