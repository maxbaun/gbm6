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
	const {height: windowHeight, width: windowWidth} = state.get('windowSize').toJS();

	let modalHeight = 0;
	let modalWidth = 0;

	let widthTall = windowWidth * 0.8; // 80% of screen
	let heightTall = widthTall * 0.5625; // 1280 x 720

	let heightWide = windowHeight * 0.8;
	let widthWide = heightWide / 0.5625;

	if (windowHeight < windowWidth && widthWide <= windowWidth) {
		modalWidth = widthWide;
		modalHeight = heightWide;
	} else {
		modalWidth = widthTall;
		modalHeight = heightTall;
	}

	return {
		modalHeight,
		modalWidth
	};
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

		const videoId = vimeoId(url);
		const isOpen = state.getIn(['offmenu', videoId]);

		return (
			<Modal
				showClose
				active={isOpen}
				backgroundColor="transparent"
				size="full"
				height={this.state.modalHeight}
				width={this.state.modalWidth}
				windowHeight={window.innerHeight}
				onClose={click(actions.offmenuHide, videoId)}
			>
				<div className={CSS.playerWrap}>
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
