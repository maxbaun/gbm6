import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ScrollToHelper} from '../../utils/componentHelpers';

export default class ScrollTo extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	static propTypes = {
		children: PropTypes.element.isRequired,
		target: PropTypes.string.isRequired,
		duration: PropTypes.number
	};

	static defaultProps = {
		duration: 400
	};

	handleClick() {
		this.scrollRef = new ScrollToHelper(this.props.target, {
			duration: this.props.duration,
			container: window
		});
	}

	render() {
		const childrenWithProps = React.cloneElement(this.props.children, {
			...this.props.children.props,
			style: {
				...this.props.children.props.style,
				cursor: 'pointer'
			},
			onClick: this.handleClick
		});

		return childrenWithProps;
	}
}
