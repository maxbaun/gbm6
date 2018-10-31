import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import ReactPlayer from 'react-player';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CSS from './videoModal.module.scss';
import {selectors as stateSelectors, actions as stateActions} from '../../ducks/state';
import Modal from './modal';
import {click, vimeoId} from '../../utils/componentHelpers';

const VimeoRatio = 0.5625;

const mapStateToProps = state => ({
	state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		{
			...stateActions
		},
		dispatch
	)
});

const getModalSize = state => {
	let {height: windowHeight, width: windowWidth} = state.get('windowSize').toJS();

	const padding = 80;

	const maxWidth = windowWidth < 768 ? windowWidth - padding : windowWidth * 0.8;
	const maxHeight = windowHeight - 80;

	let modalWidth = maxWidth;
	let modalHeight = modalWidth * VimeoRatio; // 1280 x 720

	if (modalHeight > windowHeight) {
		const size = fitVideoToMaxHeight(modalHeight, modalWidth, maxHeight);

		modalWidth = size.width;
		modalHeight = size.height;
	}

	return {
		modalHeight,
		modalWidth
	};
};

const fitVideoToMaxHeight = (videoHeight, videoWidth, maxHeight) => {
	while (videoHeight > maxHeight) {
		videoWidth -= 1;
		videoHeight = calcVideoHeight(videoWidth);
	}

	return {
		width: videoWidth,
		height: videoHeight
	};
};

const calcVideoHeight = width => {
	return width * 0.5626;
};

class VideoModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalHeight: 0,
			modalWidth: 0
		};
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		state: ImmutableProptypes.map.isRequired,
		url: PropTypes.string
	};

	static defaultProps = {
		url: null
	};

	static getDerivedStateFromProps(props, state) {
		const modalSize = getModalSize(props.state);

		return {
			...state,
			...modalSize
		};
	}

	render() {
		const {url, state, actions} = this.props;
		const {modalHeight, modalWidth} = this.state;

		const videoId = vimeoId(url);
		const isOpen = state.getIn(['offmenu', videoId]);

		return (
			<Modal
				showClose
				active={isOpen}
				backgroundColor="transparent"
				size="full"
				height={modalHeight}
				width={modalWidth}
				windowHeight={state.getIn(['windowSize', 'height'])}
				onClose={click(actions.offmenuHide, videoId)}
			>
				<div className={CSS.playerWrap} style={{height: modalHeight, width: modalWidth}}>
					{isOpen ? (
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
					) : null}
				</div>
			</Modal>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoModal);
