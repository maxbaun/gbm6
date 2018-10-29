import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {List} from 'immutable';

import CSS from './sectionFeaturedEvents.module.scss';
import VideoGrid from '../videoGrid/videoGrid';
import SectionLines from '../common/sectionLines';

const SectionFeaturedEvents = ({title, videos, perGroup}) => {
	return (
		<div data-section className={CSS.section}>
			<SectionLines/>
			<div data-clip-target>
				<div className={CSS.inner}>
					<div className="container">
						<div className="row">
							<div className="col-sm-8 offset-sm-2">
								<h3 className={CSS.title}>{title}</h3>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<div className={CSS.videos}>
								<VideoGrid videos={videos} perGroup={perGroup}/>
							</div>
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
	perGroup: PropTypes.number
};

SectionFeaturedEvents.defaultProps = {
	title: 'More Legendary Events',
	videos: List(),
	perGroup: 4
};

export default SectionFeaturedEvents;
