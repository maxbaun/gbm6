import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import ReactPlayer from 'react-player';
import {List} from 'immutable';

import CSS from './videoGrid.module.scss';
import Masonry from '../masonry/masonry';
import Modal from '../modals/modal';
import VideoPreview from '../videoPreview/videoPreview';
import {click, unique} from '../../utils/componentHelpers';

export default class VideoGrid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeVideo: 0
		};

		this.handleVideoOpen = this.handleVideoOpen.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);

		this.unique = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		state: ImmutableProptypes.map.isRequired,
		videos: ImmutableProptypes.list,
		perGroup: PropTypes.number
	};

	static defaultProps = {
		videos: List(),
		perGroup: 10
	};

	handleModalClose() {
		this.props.actions.offmenuHide(this.unique);
	}

	handleVideoOpen(videoUrl) {
		this.setState({activeVideo: videoUrl});
		this.props.actions.offmenuToggle(this.unique);
	}

	render() {
		const {videos} = this.props;

		const modalOpen = this.props.state.getIn(['offmenu', this.unique]);

		return (
			<Fragment>
				<Masonry perGroup={this.props.perGroup} items={videos}>
					{videos
						.map((video, index) => {
							return (
								<VideoPreview key={video.getIn(['fields', 'title'])} video={video} onVideoOpen={click(this.handleVideoOpen, index)}/>
							);
						})
						.toJS()}
				</Masonry>
				<Modal
					showClose
					active={modalOpen}
					backgroundColor="transparent"
					size="medium"
					windowHeight={this.props.state.getIn(['windowSize', 'height'])}
					onClose={this.handleModalClose}
				>
					<div className={CSS.playerWrap}>
						{videos
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
			</Fragment>
		);
	}
}
