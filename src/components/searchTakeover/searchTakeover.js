import React, {Component} from 'react';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';

import CSS from './searchTakeover.module.scss';
import {state, clickPrevent, noop, ref} from '../../utils/componentHelpers';

class SearchTakover extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: ''
		};

		this.input = null;

		this.handleChange = this.handleChange.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	static propTypes = {
		onSubmit: PropTypes.func,
		onOffmenuClose: PropTypes.func,
		state: ImmutableProptypes.map.isRequired
	};

	static defaultProps = {
		onSubmit: noop,
		onOffmenuClose: noop
	};

	componentDidUpdate(prevProps) {
		const prevOpen = prevProps.state.getIn(['offmenu', 'search']);
		const nextOpen = this.props.state.getIn(['offmenu', 'search']);

		if (prevOpen !== nextOpen && nextOpen) {
			setTimeout(() => {
				this.input.focus();
				this.input.select();
			}, 300);
		}
	}

	handleChange(state) {
		this.setState(state);
	}

	handleClickOutside() {
		this.props.onOffmenuClose('search');
	}

	render() {
		const isOpen = this.props.state.getIn(['offmenu', 'search']);

		const wrapCss = [CSS.takeover];

		if (isOpen) {
			wrapCss.push(CSS.takeoverActive);
		}

		return (
			<div className={wrapCss.join(' ')}>
				<form className={CSS.form} autoComplete="off" onSubmit={clickPrevent(this.props.onSubmit, this.state.query)}>
					<div className={CSS.icon}>
						<span className="fa fa-search" onClick={this.handleClickOutside}/>
					</div>
					<input
						ref={ref.call(this, 'input')}
						className={CSS.input}
						type="text"
						name="query"
						value={this.state.query}
						onChange={state(this.handleChange, 'query')}
					/>
				</form>
			</div>
		);
	}
}

export default ClickOutside(SearchTakover);
