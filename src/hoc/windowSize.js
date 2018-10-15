import React, {Component} from 'react';

export default function WindowSize(WrappedComponent) {
	return class extends Component {
		constructor(props) {
			super(props);

			this.state = {
				width: 0,
				height: 0
			};

			this.handleResize = this.handleResize.bind(this);
		}

		componentDidMount() {
			window.addEventListener('resize', this.handleResize);
			this.handleResize();
		}

		componentWillUnmount() {
			window.removeEventListener('resize', this.handleResize);
		}

		handleResize() {
			this.setState({
				width: window.innerWidth,
				height: window.innerHeight
			});
		}

		render() {
			const props = {
				windowSize: {
					width: this.state.width,
					height: this.state.height
				}
			};

			return <WrappedComponent {...this.props} {...props}/>;
		}
	};
}
