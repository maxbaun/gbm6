import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {Map} from 'immutable';

import CSS from './video.module.scss';
import Image from '../common/image';
import PlayBtn from '../playBtn/playBtn';
import {click, vimeoId} from '../../utils/componentHelpers';

const Video = ({thumbnail, previewWidth, url, actions}) => {
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
						<PlayBtn size={100} onClick={click(actions.offmenuToggle, vimeoId(url))}/>
					</div>
					<Image image={thumbnail} width={609}/>
				</div>
			</div>
		</div>
	);
};

Video.propTypes = {
	thumbnail: ImmutableProptypes.map,
	url: PropTypes.string,
	showPreview: PropTypes.bool,
	modal: PropTypes.bool,
	previewWidth: PropTypes.number,
	actions: PropTypes.objectOf(PropTypes.func).isRequired
};

Video.defaultProps = {
	thumbnail: Map(),
	url: null,
	showPreview: true,
	modal: true,
	previewWidth: 710
};

export default Video;
