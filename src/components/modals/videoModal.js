import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import ReactPlayer from 'react-player';

import CSS from './videoModal.module.scss';
import Modal from './modal';
import {click, vimeoId} from '../../utils/componentHelpers';

const VideoModal = ({url, state, actions}) => {
	const videoId = vimeoId(url);
	const isOpen = state.getIn(['offmenu', videoId]);

	return (
		<Modal
			showClose
			active={isOpen}
			backgroundColor="transparent"
			size="medium"
			windowHeight={window.innerHeight}
			onClose={click(actions.offmenuHide, videoId)}
		>
			<div className={CSS.playerWrap}>
				<ReactPlayer
					className={CSS.player}
					playing={isOpen}
					url={url}
					width="100%"
					height="100%"
					style={{
						margin: '0 auto'
					}}
				/>
			</div>
		</Modal>
	);
};

VideoModal.propTypes = {
	actions: PropTypes.objectOf(PropTypes.func).isRequired,
	state: ImmutableProptypes.map.isRequired,
	url: PropTypes.string
};

VideoModal.defaultProps = {
	url: null
};

export default VideoModal;
