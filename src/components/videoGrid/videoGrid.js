import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {List} from 'immutable';

import Masonry from '../masonry/masonry';
import VideoPreview from '../videoPreview/videoPreview';
import {click, vimeoId} from '../../utils/componentHelpers';

const VideoGrid = ({actions, videos, perGroup}) => {
	return (
		<Masonry perGroup={perGroup} items={videos}>
			{videos
				.map(video => {
					return (
						<VideoPreview
							key={video.getIn(['fields', 'title'])}
							video={video}
							onVideoOpen={click(actions.offmenuToggle, vimeoId(video.getIn(['fields', 'video'])))}
						/>
					);
				})
				.toJS()}
		</Masonry>
	);
};

VideoGrid.propTypes = {
	actions: PropTypes.objectOf(PropTypes.func).isRequired,
	state: ImmutableProptypes.map.isRequired,
	videos: ImmutableProptypes.list,
	perGroup: PropTypes.number
};

VideoGrid.defaultProps = {
	videos: List(),
	perGroup: 10
};

export default VideoGrid;
