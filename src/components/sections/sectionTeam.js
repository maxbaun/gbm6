import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {Map, List} from 'immutable';

import CSS from './sectionTeam.module.scss';
import Markdown from '../common/markdown';
import HeadingBrand from '../headingBrand/headingBrand';
import Video from '../video/video';
import TeamSlider from '../teamSlider/teamSlider';
import {responsive} from '../../constants';

export default class SectionTeam extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	static propTypes = {
		heading: PropTypes.string,
		text: PropTypes.string,
		video: ImmutableProptypes.map,
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		state: ImmutableProptypes.map,
		team: ImmutableProptypes.list
	};

	static defaultProps = {
		heading: '',
		text: '',
		video: Map(),
		state: Map(),
		team: List()
	};

	render() {
		return (
			<div data-section className={CSS.section}>
				<div className={CSS.inner}>
					<div className={CSS.sectionContainer}>
						<div className={CSS.row}>
							{window.innerWidth > responsive.desktop ? (
								<div className={CSS.col}>
									<div className={CSS.video}>
										<Video
											url={this.props.video.get('videoUrl')}
											thumbnail={this.props.video.get('videoThumbnail')}
											actions={this.props.actions}
											state={this.props.state}
											previewWidth={603}
										/>
									</div>
								</div>
							) : null}
							<div className={CSS.col}>
								<div className={CSS.content}>
									<div className={CSS.heading}>
										<HeadingBrand heading={this.props.heading}/>
									</div>
									<div className={CSS.copy}>
										<Markdown content={this.props.text}/>
									</div>
									{window.innerWidth <= responsive.desktop ? (
										<div className={CSS.video}>
											<Video
												url={this.props.video.get('videoUrl')}
												thumbnail={this.props.video.get('videoThumbnail')}
												actions={this.props.actions}
												state={this.props.state}
												previewWidth={603}
											/>
										</div>
									) : null}
								</div>
							</div>
						</div>
					</div>
					<div className={CSS.slider}>
						<TeamSlider team={this.props.team}/>
					</div>
				</div>
			</div>
		);
	}
}
