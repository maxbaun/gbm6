import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';

import CSS from './sectionFeaturedEvents.module.scss';
import {selectors as platformSelectors} from '../../ducks/platforms';
import VideoGrid from '../videoGrid/videoGrid';
import SectionLines from '../common/sectionLines';

const mapStateToProps = state => ({
	settings: platformSelectors.getWebsiteSettings(state)
});

const SectionFeaturedEvents = ({settings, videos, perGroup}) => {
	return (
		<div data-section className={CSS.section}>
			<SectionLines/>
			<div data-clip-target>
				<div className={CSS.inner}>
					<div className="container">
						<div className="row">
							<div className="col-sm-8 offset-sm-2">
								<h3 className={CSS.title}>{settings.getIn(['fields', 'moreEventsTitle']) || 'More'}</h3>
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
	settings: ImmutableProptypes.map,
	videos: ImmutableProptypes.list,
	perGroup: PropTypes.number
};

SectionFeaturedEvents.defaultProps = {
	settings: Map(),
	videos: List(),
	perGroup: 4
};

export default connect(mapStateToProps)(SectionFeaturedEvents);
