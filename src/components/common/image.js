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
		image: ImmutablePropTypes.map
	};

	static defaultProps = {
		image: Map()
	};

	getUrl() {
		return this.props.image.getIn(['fields', 'file', 'url']);
	}

	render() {
		const {image} = this.props;

		const url = this.getUrl();

		if (!url) {
			return null;
		}

		return <img src={url} alt={image.getIn(['fields', 'title'])}/>;
	}
}
