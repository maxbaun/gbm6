import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {Map} from 'immutable';

import CSS from './video.module.scss';
import Modal from '../modals/modal';
import {click, ref, vimeoId} from '../../utils/componentHelpers';

export default class Video extends Component {
	constructor(props) {
		super(props);

		this.playBtn = null;
		this.handlePlayClick = this.handlePlayClick.bind(this);
		this.vimeoId = this.vimeoId.bind(this);
	}

	static propTypes = {
		thumbnail: ImmutableProptypes.map,
		url: PropTypes.string,
		showPreview: PropTypes.bool,
		modal: PropTypes.bool,
		previewWidth: PropTypes.number,
		state: ImmutableProptypes.map,
		actions: PropTypes.objectOf(PropTypes.func).isRequired
	};

	static defaultProps = {
		thumbnail: Map(),
		url: null,
		showPreview: true,
		modal: true,
		previewWidth: 710,
		state: Map()
	};

	vimeoId() {
		return vimeoId(this.props.url);
	}

	handlePlayClick() {
		this.playBtn.classList.add(CSS.playAnimated);
		setTimeout(() => {
			this.playBtn.classList.remove(CSS.playAnimated);
		}, 2000);

		this.props.actions.offmenuToggle(this.vimeoId());
	}

	render() {
		const {thumbnail, previewWidth, url} = this.props;

		const previewStyle = {
			width: previewWidth,
			margin: '0 auto',
			maxWidth: '100%',
			height: 'auto'
		};

		return (
			<div>
				<div className={CSS.preview} style={previewStyle}>
					<div className={CSS.previewInner}>
						<div className={CSS.previewOverlay}>
							<div ref={ref.call(this, 'playBtn')} className={CSS.play} onClick={this.handlePlayClick}>
								<span className={CSS.icon}/>
							</div>
						</div>
						<img src={thumbnail.get('src')}/>
					</div>
				</div>
				<Modal
					showClose
					active={this.props.state.getIn(['offmenu', this.vimeoId()])}
					backgroundColor="transparent"
					size="medium"
					windowHeight={this.props.state.getIn(['windowSize', 'height'])}
					onClose={click(this.props.actions.offmenuHide, url)}
				>
					<div className={CSS.playerWrap}>
						<ReactPlayer
							className={CSS.player}
							url={url}
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
