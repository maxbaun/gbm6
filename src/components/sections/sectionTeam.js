import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {Map, List} from 'immutable';

import CSS from './sectionTeam.module.scss';
import Markdown from '../common/markdown';
import HeadingBrand from '../headingBrand/headingBrand';
import Video from '../video/video';
import TeamSlider from '../teamSlider/teamSlider';
import SectionLines from '../common/sectionLines';

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
		team: ImmutableProptypes.list,
		id: PropTypes.string.isRequired,
		state: ImmutableProptypes.map.isRequired
	};

	static defaultProps = {
		heading: '',
		text: '',
		video: Map(),
		team: List()
	};

	componentDidMount() {
		this.props.actions.addVideoModal([this.props.video.get('videoUrl')]);
	}

	render() {
		return (
			<div data-section id={this.props.id} className={CSS.section}>
				<div data-clip-target>
					<SectionLines state={this.props.state}/>
					<div className={CSS.inner}>
						<div className="container">
							<div className="row align-items-md-center">
								<div className="col col-lg-6 col-xl-5 d-none d-lg-block">
									<div className={CSS.video}>
										<Video
											url={this.props.video.get('videoUrl')}
											thumbnail={this.props.video.get('videoThumbnail')}
											actions={this.props.actions}
											previewWidth={603}
										/>
									</div>
								</div>
								<div className="col col-lg-6 col-xl-6 offset-xl-1">
									<div className={CSS.content}>
										<div className={CSS.heading}>
											<HeadingBrand heading={this.props.heading}/>
										</div>
										<div className={CSS.copy}>
											<Markdown content={this.props.text}/>
										</div>
										<div className="d-lg-none">
											<div className={CSS.video}>
												<Video
													url={this.props.video.get('videoUrl')}
													thumbnail={this.props.video.get('videoThumbnail')}
													actions={this.props.actions}
													previewWidth={603}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className={CSS.slider}>
							<TeamSlider team={this.props.team}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
