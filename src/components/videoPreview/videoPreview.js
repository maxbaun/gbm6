import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import * as ImmutableProptypes from 'react-immutable-proptypes';

import CSS from './videoPreview.module.scss';
import {portfolioBase} from '../../constants';
import Image from '../common/image';

const VideoPreview = ({video, onVideoOpen}) => {
	const firstImage = video.getIn(['fields', 'images', 0]);

	return (
		<div className={CSS.preview}>
			<div className={CSS.inner}>
				<div className={CSS.image}>
					<Image image={firstImage} width={400} height={600} f="center" fit="thumb"/>
				</div>
				<div className={CSS.content}>
					<div className={CSS.contentInner}>
						{video.getIn(['fields', 'video']) ? (
							<div className={CSS.iconVideo} onClick={onVideoOpen}>
								<span className="icon icon-play-btn"/>
							</div>
						) : (
							<div className={CSS.iconPhoto}>
								<span className="far fa-images"/>
							</div>
						)}
						<span className={CSS.date}>{video.getIn(['fields', 'date'])}</span>
						<h3 className={CSS.title}>{video.getIn(['fields', 'title'])}</h3>
						<span className={CSS.location}>{video.getIn(['fields', 'location'])}</span>
						<Link to={`/${portfolioBase}/${video.getIn(['fields', 'slug'])}`} className={CSS.link}>
							{video.getIn(['fields', 'linkTitle']) || 'View Details'}
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
