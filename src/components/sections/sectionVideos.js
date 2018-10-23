import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Map, List} from 'immutable';
import ReactPlayer from 'react-player';

import CSS from './sectionVideos.module.scss';
import HeadingBrand from '../headingBrand/headingBrand';
import VideoPreview from '../videoPreview/videoPreview';
import Masonry from '../masonry/masonry';
import Modal from '../modals/modal';
import {click} from '../../utils/componentHelpers';

const perPage = 1;

export default class SectionVideos extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeVideo: null,
			activeCategory: 0,
			page: 1
		};

		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleVideoOpen = this.handleVideoOpen.bind(this);
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
		id: null,
		showCategories: true
	};

	handleModalClose() {
		this.setState({activeVideo: null});
		this.props.actions.offmenuHide('videoModal');
	}

	handleVideoOpen(videoUrl) {
		this.setState({activeVideo: videoUrl});
		this.props.actions.offmenuToggle('videoModal');
	}

	handleCategoryChange(activeCategory) {
		this.setState({activeCategory, page: 1});
	}

	handleLoadMore() {
		this.getNextVideos(this.state.page + 1);
	}

	hasMore() {
		const activeVideos = this.getActiveVideos();

		return activeVideos.count() > this.state.page * perPage;
	}

	getNextVideos(page) {
		this.setState({page});
	}

	getPaginatedVideos() {
		return this.getActiveVideos().take(this.state.page * perPage);
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
		const {id, heading, categories, allVideosText, videos, allVideosLink, categoryAlign, showCategories} = this.props;

		const paginatedVideos = this.getPaginatedVideos();
		const hasMore = this.hasMore();

		return (
			<div data-section id={id} className={CSS.section}>
				<div data-lines>
					<div data-line/>
					<div data-line/>
				</div>
				<div className={CSS.inner}>
					<div className={CSS.header}>
						<div className={CSS.content}>
							<div className={CSS.row}>
								{heading && heading !== '' ? (
									<div className={CSS.col}>
										<div className={CSS.heading}>
											<HeadingBrand heading={this.props.heading}/>
										</div>
									</div>
								) : null}

								{allVideosLink ? (
									<div className={CSS.col}>
										<Link to={allVideosLink} className={CSS.allVideosLink}>
											{allVideosText}
										</Link>
									</div>
								) : null}
							</div>
						</div>
						{showCategories ? (
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
						) : null}
					</div>
					<div className={CSS.videos}>
						<Masonry items={videos}>
							{paginatedVideos
								.map(video => {
									return (
										<div key={video.getIn(['fields', 'title'])} className={CSS.video}>
											<VideoPreview video={video} onVideoOpen={click(this.handleVideoOpen, video.getIn(['fields', 'video']))}/>
										</div>
									);
								})
								.toJS()}
						</Masonry>
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
				<Modal
					showClose
					active={this.props.state.getIn(['offmenu', 'videoModal'])}
					backgroundColor="transparent"
					size="medium"
					windowHeight={this.props.state.getIn(['windowSize', 'height'])}
					onClose={this.handleModalClose}
				>
					<div className={CSS.playerWrap}>
						<ReactPlayer
							className={CSS.player}
							url={this.state.activeVideo}
							playing={Boolean(this.state.activeVideo)}
							width="100%"
							height="100%"
							style={{
								margin: '0 auto'
							}}
						/>
					</div>
				</Modal>
			</div>
		);
	}
}
