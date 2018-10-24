import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Map, List} from 'immutable';
import ReactPlayer from 'react-player';

import CSS from './sectionVideos.module.scss';
import HeadingBrand from '../headingBrand/headingBrand';
import {click, unique} from '../../utils/componentHelpers';
import InView from '../hoc/inView';
import VideoGrid from '../videoGrid/videoGrid';
import {videosPerPage} from '../../constants';

class SectionVideos extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeCategory: 0,
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
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		categoryAlign: PropTypes.oneOf(['left', 'center']),
		id: PropTypes.string,
		showCategories: PropTypes.bool,
		hasAppeared: PropTypes.bool.isRequired
	};

	static defaultProps = {
		state: Map(),
		heading: null,
		videos: List(),
		categories: List(),
		allVideosLink: null,
		allVideosText: 'All Videos',
		categoryAlign: 'left',
		id: null,
		showCategories: true
	};

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

		const activeCategory = this.props.categories.find((cat, index) => index === this.state.activeCategory);

		return this.props.videos.reduce((list, video) => {
			if (this.videoHasCategory(video, activeCategory)) {
				return list.push(video);
			}

			return list;
		}, List());
	}

	videoHasCategory(video, category) {
		let hasCategory = false;

		video.getIn(['fields', 'categories']).forEach(cat => {
			if (cat.getIn(['fields', 'slug']) === category.getIn(['fields', 'slug'])) {
				hasCategory = true;
			}
		});

		return hasCategory;
	}

	render() {
		const {id, heading, categories, allVideosText, allVideosLink, categoryAlign, showCategories, hasAppeared} = this.props;

		const paginatedVideos = this.getPaginatedVideos();
		const hasMore = this.hasMore();

		return (
			<div data-section id={id} className={CSS.section}>
				<div data-lines>
					<div data-line/>
					<div data-line/>
				</div>
				<div className={CSS.inner}>
					<div className="container">
						<div className={CSS.content}>
							<div className="row align-items-end">
								{heading && heading !== '' ? (
									<div className="col-md-6 col-lg-5 offset-md-1">
										<div className={CSS.heading}>
											<HeadingBrand heading={this.props.heading}/>
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
						{showCategories ? (
							<div className="row">
								<div className="col-md-11 offset-md-1">
									<ul className={CSS.categories} data-align={categoryAlign}>
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
								</div>
							</div>
						) : null}
					</div>
					{hasAppeared ? (
						<div className={CSS.videos}>
							<VideoGrid
								videos={paginatedVideos}
								perGroup={this.state.perGroup}
								state={this.props.state}
								actions={this.props.actions}
							/>
						</div>
					) : null}
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
		);
	}
}

export default InView(SectionVideos, {partialVisibility: true, delayedCall: true, scrollDelay: 2000});
