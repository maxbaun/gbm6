import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Map, List} from 'immutable';
import Masonry from 'react-masonry-component';
import ReactPlayer from 'react-player';

import CSS from './sectionVideos.module.scss';
import HeadingBrand from '../headingBrand/headingBrand';
import VideoPreview from '../videoPreview/videoPreview';
import Modal from '../modals/modal';
import {click} from '../../utils/componentHelpers';
import {responsive} from '../../constants';

export default class SectionVideos extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeVideo: null,
			activeCategory: 0
		};

		this.getHeadingWidth = this.getHeadingWidth.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleVideoOpen = this.handleVideoOpen.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
	}

	static propTypes = {
		state: ImmutableProptypes.map,
		heading: PropTypes.string,
		videos: ImmutableProptypes.list,
		videoCategories: ImmutableProptypes.list,
		allVideosLink: PropTypes.string,
		allVideosText: PropTypes.string,
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		categoryAlign: PropTypes.oneOf(['left', 'center']),
		id: PropTypes.string
	};

	static defaultProps = {
		state: Map(),
		heading: null,
		videos: List(),
		videoCategories: List(),
		allVideosLink: null,
		allVideosText: 'All Videos',
		categoryAlign: 'left',
		id: null
	};

	getHeadingWidth() {
		const {width} = this.props.state.get('windowSize').toJS();

		if (width > responsive.desktop) {
			return 554;
		}

		if (width > responsive.tablet) {
			return 400;
		}

		return 320;
	}

	handleModalClose() {
		this.setState({activeVideo: null});
		this.props.actions.offmenuHide('videoModal');
	}

	handleVideoOpen(videoUrl) {
		this.setState({activeVideo: videoUrl});
		this.props.actions.offmenuToggle('videoModal');
	}

	handleCategoryChange(activeCategory) {
		this.setState({activeCategory});
	}

	render() {
		const {id, heading, videoCategories, allVideosText, videos, allVideosLink, categoryAlign} = this.props;

		return (
			<div data-section id={id} className={CSS.section}>
				<div className={CSS.inner}>
					<div className={CSS.header}>
						<div className={CSS.content}>
							<div className={CSS.row}>
								{heading && heading !== '' ? (
									<div className={CSS.col}>
										<div className={CSS.heading}>
											<HeadingBrand isMobile={false} heading={this.props.heading} width={this.getHeadingWidth()}/>
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
						<ul className={CSS.categories} data-align={categoryAlign}>
							{videoCategories.map((category, index) => {
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
					<div className={CSS.videos}>
						<Masonry updateOnEachImageLoad className={CSS.grid}>
							{videos.map(video => {
								return (
									<div key={video.get('title')} className={CSS.gridItem}>
										<VideoPreview video={video} onVideoOpen={click(this.handleVideoOpen, video.get('video'))}/>
									</div>
								);
							})}
						</Masonry>
					</div>
					<div className={CSS.loadMoreBtn}>
						<div className={CSS.btn}>
							<button type="button" className="btn btn-outline">
								Load more videos
							</button>
						</div>
					</div>
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
