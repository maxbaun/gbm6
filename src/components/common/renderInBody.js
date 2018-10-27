import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class RenderInBody extends Component {
	constructor(props) {
		super(props);

		this.elem = null;
	}

	static propTypes = {
		children: PropTypes.node.isRequired
	};

	componentDidMount() {
		this.elem = document.createElement('div');
		document.body.appendChild(this.elem);
		this.renderLayer();
	}

	componentDidUpdate() {
		this.renderLayer();
	}

	componentWillUnmount() {
		if (!this.elem) {
			return;
		}

		ReactDOM.unmountComponentAtNode(this.elem);
		document.body.removeChild(this.elem);
	}

	renderLayer() {
		ReactDOM.render(this.props.children, this.elem);
	}

	render() {
		// eslint-disable-next-line react/no-children-prop
		return null;
	}
}
