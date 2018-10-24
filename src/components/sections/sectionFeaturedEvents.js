import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {List} from 'immutable';

import CSS from './sectionFeaturedEvents.module.scss';
import VideoGrid from '../videoGrid/videoGrid';

const SectionFeaturedEvents = ({title, videos, state, actions}) => {
	return (
		<div data-section className={CSS.section}>
			<div className={CSS.inner}>
				<div className="row">
					<div className="col-sm-8 offset-sm-2">
						<h3 className={CSS.title}>{title}</h3>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<div className={CSS.videos}>
							<VideoGrid videos={videos} perGroup={4} state={state} actions={actions}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

SectionFeaturedEvents.propTypes = {
	title: PropTypes.string,
	videos: ImmutableProptypes.list,
	state: ImmutableProptypes.map.isRequired,
	actions: PropTypes.objectOf(PropTypes.func).isRequired
};

SectionFeaturedEvents.defaultProps = {
	title: 'More Legendary Events',
	videos: List()
};

export default SectionFeaturedEvents;