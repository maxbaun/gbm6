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
import {click, unique} from '../../utils/componentHelpers';
import InView from '../hoc/inView';
import {videosPerPage} from '../../constants';

class SectionVideos extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeVideo: 0,
			activeCategory: 0,
			page: 1,
			perGroup: videosPerPage
		};

		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleVideoOpen = this.handleVideoOpen.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleLoadMore = this.handleLoadMore.bind(this);
		this.hasMore = this.hasMore.bind(this);
		this.getActiveVideos = this.getActiveVideos.bind(this);

		this.unique = unique();
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

	handleModalClose() {
		this.props.actions.offmenuHide(this.unique);
	}

	handleVideoOpen(videoUrl) {
		this.setState({activeVideo: videoUrl});
		this.props.actions.offmenuToggle(this.unique);
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
		const {id, heading, categories, allVideosText, videos, allVideosLink, categoryAlign, showCategories, hasAppeared} = this.props;

		const paginatedVideos = this.getPaginatedVideos();
		const hasMore = this.hasMore();

		const modalOpen = this.props.state.getIn(['offmenu', this.unique]);

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
					{hasAppeared ? (
						<div className={CSS.videos}>
							<Masonry perGroup={this.state.perGroup} items={videos}>
								{paginatedVideos
									.map((video, index) => {
										return (
											<div key={video.getIn(['fields', 'title'])} className={CSS.video}>
												<VideoPreview video={video} onVideoOpen={click(this.handleVideoOpen, index)}/>
											</div>
										);
									})
									.toJS()}
							</Masonry>
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
				<Modal
					showClose
					active={modalOpen}
					backgroundColor="transparent"
					size="medium"
					windowHeight={this.props.state.getIn(['windowSize', 'height'])}
					onClose={this.handleModalClose}
				>
					<div className={CSS.playerWrap}>
						{paginatedVideos
							.map((video, index) => {
								const isActiveVideo = index === this.state.activeVideo;

								return (
									<ReactPlayer
										playsinline
										// eslint-disable-next-line
										key={index}
										className={CSS.player}
										url={video.getIn(['fields', 'video'])}
										playing={modalOpen && isActiveVideo}
										width="100%"
										height="100%"
										style={{
											margin: '0 auto',
											display: isActiveVideo ? 'block' : 'none'
										}}
										onPlay={() => {
											console.log('playing');
										}}
									/>
								);
							})
							.toJS()}
					</div>
				</Modal>
			</div>
		);
	}
}

export default InView(SectionVideos, {partialVisibility: true, delayedCall: true, scrollDelay: 2000});
