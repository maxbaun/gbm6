import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import * as ImmutableProptypes from 'react-immutable-proptypes';

import CSS from './videoPreview.module.scss';

const VideoPreview = ({video, onVideoOpen}) => {
	const firstImage = video.getIn(['images', 0]);

	const contentStyle = {
		backgroundImage: `url(${firstImage.get('src')})`
	};

	return (
		<div className={CSS.preview}>
			<div className={CSS.inner} style={contentStyle}>
				<div className={CSS.content}>
					<div className={CSS.contentInner}>
						{video.get('video') ? (
							<div className={CSS.iconVideo} onClick={onVideoOpen}>
								<span className="far fa-play-circle"/>
							</div>
						) : (
							<div className={CSS.iconPhoto}>
								<span className="far fa-images"/>
							</div>
						)}
						<span className={CSS.date}>{video.get('date')}</span>
						<h3 className={CSS.title}>{video.get('title')}</h3>
						<span className={CSS.location}>{video.get('location')}</span>
						<Link to={`/${video.get('slug')}`} className={CSS.link}>
							{video.get('linkTitle') || 'View Details'}
						</Link>
						<div className={CSS.overlay}/>
					</div>
				</div>
			</div>
		</div>
	);
};

VideoPreview.propTypes = {
	video: ImmutableProptypes.map.isRequired,
	onVideoOpen: PropTypes.func.isRequired
};

export default VideoPreview;
