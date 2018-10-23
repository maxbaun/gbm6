import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';

import CSS from './sectionHero.module.scss';
import Markdown from '../common/markdown';
import ScrollTo from '../common/scrollTo';
import Image from '../common/image';

export default class SectionHero extends Component {
	constructor(props) {
		super(props);

		this.image = null;
	}

	static propTypes = {
		image: ImmutablePropTypes.map,
		content: PropTypes.string,
		imageCss: PropTypes.object,
		scrollColor: PropTypes.string,
		scrollTo: PropTypes.string
	};

	static defaultProps = {
		image: Map(),
		content: null,
		imageCss: {},
		scrollColor: '#FFF',
		scrollTo: null
	};

	render() {
		const {scrollColor, scrollTo, image, imageCss} = this.props;

		return (
			<div data-section className={CSS.hero}>
				<div
					className={CSS.image}
					style={{
						...imageCss,
						backgroundImage: `url(${image.getIn(['fields', 'file', 'url'])})`
					}}
				/>
				{scrollTo && scrollTo !== '' ? (
					<ScrollTo target={scrollTo}>
						<div className={CSS.scroll}>
							<div className={CSS.scrollLine} style={{backgroundColor: scrollColor}}/>
							<div className={CSS.scrollLine} style={{backgroundColor: scrollColor}}/>
						</div>
					</ScrollTo>
				) : null}
				<div className={CSS.content}>
					<Markdown className={CSS.contentInner} content={this.props.content}/>
				</div>
			</div>
		);
	}
}
