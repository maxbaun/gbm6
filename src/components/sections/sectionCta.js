import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map, fromJS} from 'immutable';

import CSS from './sectionCta.module.scss';
import {selectors as stateSelectors} from '../../ducks/state';
import {actions as formActions} from '../../ducks/forms';
import {selectors as platformSelectors} from '../../ducks/platforms';
import HeadingBrand from '../headingBrand/headingBrand';
import {state, unique, isLoading, getError, getSuccess} from '../../utils/componentHelpers';
import Markdown from '../common/markdown';
import Button from '../button/button';
import SectionLines from '../common/sectionLines';

const initialState = {
	name: '',
	email: '',
	organization: '',
	message: ''
};

const fetch = unique();

const mapStateToProps = state => ({
	state: stateSelectors.getState(state),
	settings: platformSelectors.getWebsiteSettings(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		{
			...formActions
		},
		dispatch
	)
});

class SectionCta extends Component {
	constructor(props) {
		super(props);

		this.state = initialState;

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		state: ImmutableProptypes.map.isRequired,
		settings: ImmutableProptypes.map
	};

	static defaultProps = {
		settings: Map()
	};

	static getDerivedStateFromProps(props, state) {
		const success = getSuccess(fetch, props.state);

		if (!success) {
			return state;
		}

		return initialState;
	}

	handleSubmit(e) {
		e.preventDefault();

		this.props.actions.formCreate({
			fetch: fetch,
			payload: {
				key: 'contact',
				data: this.state,
				formName: 'Contact Form',
				success: 'Thank you for contacting us! We will be in touch shortly!'
			}
		});
	}

	handleChange(state) {
		this.setState(state);
	}

	render() {
		return (
			<div data-section id="contact" className={CSS.section}>
				<div data-clip-target>
					<SectionLines/>
					<div className={CSS.inner}>
						<div className="container">
							<div className="row">
								<div className="col-lg-10 offset-lg-1">
									<div className={CSS.header}>
										{this.renderHeader()}
										{this.renderContact()}
										{this.renderSocial()}
									</div>
									<div className={CSS.content}>{this.renderForm()}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderHeader() {
		const {settings} = this.props;

		return (
			<div className={CSS.heading}>
				<HeadingBrand heading={settings.getIn(['fields', 'ctaTitle'])}/>
			</div>
		);
	}

	renderContact() {
		const {settings} = this.props;

		return (
			<div className={CSS.contact}>
				<ul className={CSS.contactItems}>
					<li className={CSS.contactItem}>
						<h3>Phone</h3>
						<h5>{settings.getIn(['fields', 'phone'])}</h5>
					</li>
					<li className={CSS.contactItem}>
						<h3>Email</h3>
						<h5>{settings.getIn(['fields', 'email'])}</h5>
					</li>
				</ul>
			</div>
		);
	}

	renderSocial() {
		const {settings} = this.props;

		const icons = fromJS([
			{
				property: 'twitter',
				icon: 'fab fa-twitter',
				url: settings.getIn(['fields', 'twitter'])
			},
			{
				property: 'facebook',
				icon: 'fab fa-facebook-f',
				url: settings.getIn(['fields', 'facebook'])
			},
			{
				property: 'vimeo',
				icon: 'fab fa-vimeo',
				url: settings.getIn(['fields', 'vimeo'])
			},
			{
				property: 'soundcloud',
				icon: 'fab fa-soundcloud',
				url: settings.getIn(['fields', 'soundcloud'])
			},
			{
				property: 'instagram',
				icon: 'fab fa-instagram',
				url: settings.getIn(['fields', 'instagram'])
			},
			{
				property: 'youtube',
				icon: 'fab fa-youtube',
				url: settings.getIn(['fields', 'youtube'])
			}
		]);

		return (
			<div className={CSS.social}>
				<div className={CSS.socialInner}>
					<ul className={CSS.socialIcons}>
						{icons.map(icon => {
							return (
								<li key={icon} className={CSS.socialIcon}>
									<a href={icon.get('url')}>
										<span className={icon.get('icon')}/>
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}

	renderForm() {
		const success = getSuccess(fetch, this.props.state);
		const error = getError(fetch, this.props.state);
		const loading = isLoading(fetch, this.props.state);

		return (
			<div className={CSS.form}>
				<form onSubmit={this.handleSubmit}>
					<ul>
						<li>
							<label htmlFor="name">Your Name</label>
							<input type="text" name="name" value={this.state.name} onChange={state(this.handleChange, 'name')}/>
						</li>
						<li>
							<label htmlFor="email">Your Email</label>
							<input type="email" name="email" value={this.state.email} onChange={state(this.handleChange, 'email')}/>
						</li>

						<li>
							<label htmlFor="organization">Your organization</label>
							<input
								type="text"
								name="organization"
								value={this.state.organization}
								onChange={state(this.handleChange, 'organization')}
							/>
						</li>
						<li className={CSS.full}>
							<label htmlFor="message">Your Message</label>
							<textarea name="message" value={this.state.message} onChange={state(this.handleChange, 'message')}/>
						</li>
						<li className={CSS.full}>
							<div className={CSS.notifications}>
								{error ? <Markdown content={error} className={CSS.error}/> : null}
								{success ? <Markdown content={success} className={CSS.success}/> : null}
							</div>
							<div className={CSS.submitWrap}>
								<Button text="submit" className="btn btn-primary" type="submit" loading={loading}/>
							</div>
						</li>
					</ul>
				</form>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SectionCta);
