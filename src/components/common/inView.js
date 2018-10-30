import React, {Component} from 'react';
import VisibilitySensor from 'react-visibility-sensor';

export default function InView(WrappedComponent, props = {}) {
	return class extends Component {
		constructor(props) {
			super(props);

			this.state = {
				inView: false,
				hasAppeared: false
			};

			this.handleChange = this.handleChange.bind(this);
		}

		handleChange(inView) {
			this.setState(prevState => {
				return {
					hasAppeared: (inView && prevState.hasAppeared === false) || prevState.hasAppeared,
					inView
				};
			});
		}

		render() {
			return (
				<VisibilitySensor {...props} onChange={this.handleChange}>
					<WrappedComponent {...this.props} {...this.state}/>
				</VisibilitySensor>
			);
		}
	};
}
