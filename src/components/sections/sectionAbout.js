import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';

import CSS from './sectionAbout.module.scss';
import Markdown from '../common/markdown';
import HeadingBrand from '../headingBrand/headingBrand';
import AngledSection from '../angledSection/angledSection';
import {responsive} from '../../constants';

export default class SectionAbout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			angleBleed: 0
		};

		this.getHeadingWidth = this.getHeadingWidth.bind(this);
		this.handleAngleChange = this.handleAngleChange.bind(this);
	}

	static propTypes = {
		style: PropTypes.object,
		heading: PropTypes.string,
		text: PropTypes.string,
		backgroundImage: ImmutablePropTypes.map,
		icons: PropTypes.string,
		state: ImmutablePropTypes.map.isRequired,
		id: PropTypes.string.isRequired,
		counters: PropTypes.string,
		slantDirection: PropTypes.string,
		prevSectionBleed: PropTypes.number
	};

	static defaultProps = {
		style: {},
		heading: '',
		text: '',
		backgroundImage: Map(),
		icons: '',
		counters: '',
		slantDirection: 'left',
		prevSectionBleed: 0
	};

	componentDidMount() {
		console.log('sectionAbout mount');
	}

	handleAngleChange(angleBleed) {
		this.setState({angleBleed});
	}

	getHeadingWidth() {
		const {width} = this.props.state.get('windowSize').toJS();

		if (width > responsive.desktop) {
			return 554;
		}

		if (width > responsive.tablet) {
			return 400;
		}

		return 320;
	}

	render() {
		const {angleBleed} = this.state;
		const icons = this.props.icons.split('\n');
		const counters = this.props.counters.split('\n');

		return (
			<div data-section id={this.props.id} className={CSS.section}>
				<div className={CSS.background}>
					<img src={this.props.backgroundImage.get('src')}/>
				</div>
				<div className={CSS.inner}>
					<div className={CSS.content}>
						<div className={CSS.row}>
							<div className={CSS.col}>
								<div className={CSS.heading}>
									<HeadingBrand
										isMobile={this.props.state.getIn(['windowSize', 'width']) < responsive.collapse}
										heading={this.props.heading}
										width={this.getHeadingWidth()}
									/>
								</div>
							</div>
							<div className={CSS.col}>
								<div className={CSS.text}>
									<Markdown content={this.props.text}/>
								</div>
							</div>
						</div>
					</div>
					{icons && icons.length ? (
						<ul className={CSS.iconBlocks}>
							{icons &&
								icons.map(icon => {
									const parts = icon.split(':');

									return (
										<li key={icon} className={CSS.iconBlock}>
											<div className={CSS.icon}>
												<span className={parts[0]}/>
												<p>{parts[1]}</p>
											</div>
										</li>
									);
								})}
						</ul>
					) : null}
					{counters && counters.length ? (
						<div className={CSS.counters}>
							<ul className={CSS.counterBlocks}>
								{counters.map(counter => {
									const parts = counter.split(':');

									return (
										<li key={parts[0] + parts[2]} className={CSS.counterBlock}>
											<div className={CSS.counter}>
												<h3>
													{parts[0]}
													{parts[1]}
												</h3>
												<p>{parts[2]}</p>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}
