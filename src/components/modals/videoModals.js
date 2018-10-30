import React from 'react';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {fromJS} from 'immutable';

import {selectors as stateSelectors} from '../../ducks/state';
import VideoModal from './videoModal';

const mapStateToProps = state => ({
	state: stateSelectors.getState(state)
});

const VideoModals = ({state}) => {
	return state.get('videoModals').map(video => {
		return <VideoModal key={video} url={video}/>;
	});
};

VideoModals.propTypes = {
	state: ImmutableProptypes.map
};

VideoModals.defaultProps = {
	state: fromJS({
		videoModals: []
	})
};

export default connect(mapStateToProps)(VideoModals);
