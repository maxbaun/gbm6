import React, {Component} from 'react';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Remarkable from 'remarkable';
import {connect} from 'react-redux';

import CSS from './headingBrand.module.scss';
import {selectors as stateSelectors} from '../../ducks/state';
import LogoPolygon from '../common/logoPolygon';
import {innerHtml, ref} from '../../utils/componentHelpers';

const md = new Remarkable({
	html: true
});

const mapStateToProps = state => ({
	state: stateSelectors.getState(state)
});

class HeadingBrand extends Component {
	constructor(props) {
		super(props);

		this.state = {
			maxWidth: 0
		};

		this.heading = null;
	}

	static propTypes = {
		state: ImmutableProptypes.map.isRequired,
		heading: PropTypes.string,
		headingClass: PropTypes.string
	};

	static defaultProps = {
		heading: '',
		headingClass: null
	};

	componentDidMount() {
		this.setSizing();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.state.getIn(['windowSize', 'width']) !== this.props.state.getIn(['windowSize', 'width'])) {
			this.setSizing();
		}
	}

	setSizing() {
		if (!this.heading) {
			return;
		}

		const headingDiv = this.heading.querySelector('div');

		const childNodes = [...headingDiv.childNodes];

		let maxWidth = childNodes.reduce((max, child) => {
			if (child.offsetWidth > max) {
				return child.offsetWidth;
			}

			return max;
		}, 0);

		this.setState({maxWidth});
	}

	render() {
		const {heading, headingClass} = this.props;
		const {maxWidth} = this.state;

		const parsed = md.render(heading);

		return (
			<div className={CSS.wrap}>
				<div className={CSS.polygon}>
					<LogoPolygon height={20} width={maxWidth}/>
				</div>
				<div ref={ref.call(this, 'heading')} className={headingClass ? headingClass : CSS.heading}>
					{/* eslint-disable-next-line react/no-danger */}
					<div dangerouslySetInnerHTML={innerHtml(parsed)}/>
				</div>
				<div className={CSS.polygon}>
					<LogoPolygon flipped height={20} width={maxWidth}/>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(HeadingBrand);
