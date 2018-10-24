import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';

export default class Image extends Component {
	constructor(props) {
		super(props);

		this.image = null;

		this.getUrl = this.getUrl.bind(this);
	}

	static propTypes = {
		image: ImmutablePropTypes.map,
		background: PropTypes.bool,
		style: PropTypes.object,
		className: PropTypes.string,
		width: PropTypes.number
	};

	static defaultProps = {
		image: Map(),
		background: false,
		style: {},
		className: '',
		width: 0
	};

	getUrl() {
		const {width, image} = this.props;
		const baseUrl = image.getIn(['fields', 'file', 'url']);

		if (!baseUrl) {
			return undefined;
		}

		let url = baseUrl + '?';

		if (width > 0) {
			url += `w=${width}?`;
		}

		return url.slice(0, -1);
	}

	render() {
		const {image, background, className, style} = this.props;

		const url = this.getUrl();

		if (!url) {
			return null;
		}

		if (background) {
			return <div className={className} style={{...style, backgroundImage: `url(${url})`}}/>;
		}

		return <img src={url} alt={image.getIn(['fields', 'title'])}/>;
	}
}
