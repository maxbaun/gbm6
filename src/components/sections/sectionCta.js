import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {Map, fromJS} from 'immutable';

import CSS from './sectionCta.module.scss';
import HeadingBrand from '../headingBrand/headingBrand';
import {state} from '../../utils/componentHelpers';

export default class SectionCta extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			organization: '',
			message: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	static propTypes = {
		siteSettings: ImmutableProptypes.map
	};

	static defaultProps = {
		siteSettings: Map()
	};

	handleSubmit(e) {
		e.preventDefault();

		console.log('form submitted');
	}

	handleChange(state) {
		this.setState(state);
	}

	render() {
		return (
			<div data-section className={CSS.section}>
				<div className={CSS.wrap}>
					<div className={CSS.inner}>
						<Fragment>
							<div className={CSS.header}>
								<div className={CSS.row}>
									<div className={CSS.colHeading}>{this.renderHeader()}</div>
									<div className={CSS.colContact}>{this.renderContact()}</div>
									<div className={CSS.colSocial}>{this.renderSocial()}</div>
								</div>
							</div>
							<div className={CSS.content}>{this.renderForm()}</div>
						</Fragment>
					</div>
				</div>
			</div>
		);
	}

	renderHeader() {
		return (
			<div className={CSS.heading}>
				<HeadingBrand heading={this.props.siteSettings.get('ctaTitle')}/>
			</div>
		);
	}

	renderContact() {
		const {siteSettings} = this.props;

		return (
			<div className={CSS.contact}>
				<ul className={CSS.contactItems}>
					<li className={CSS.contactItem}>
						<h3>Phone</h3>
						<h5>{siteSettings.get('phone')}</h5>
					</li>
					<li className={CSS.contactItem}>
						<h3>Email</h3>
						<h5>{siteSettings.get('email')}</h5>
					</li>
				</ul>
			</div>
		);
	}

	renderSocial() {
		const {siteSettings} = this.props;

		const icons = fromJS([
			{
				property: 'twitter',
				icon: 'fab fa-twitter'
			},
			{
				property: 'facebook',
				icon: 'fab fa-facebook-f'
			},
			{
				property: 'vimeo',
				icon: 'fab fa-vimeo'
			},
			{
				property: 'soundcloud',
				icon: 'fab fa-soundcloud'
			},
			{
				property: 'instagram',
				icon: 'fab fa-instagram'
			},
			{
				property: 'youtube',
				icon: 'fab fa-youtube'
			}
		]);

		return (
			<div className={CSS.social}>
				<ul className={CSS.socialIcons}>
					{icons.map(icon => {
						return (
							<li key={icon} className={CSS.socialIcon}>
								<a href={siteSettings.get(icon.get('property'))}>
									<span className={icon.get('icon')}/>
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}

	renderForm() {
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
							<input type="email" value={this.state.email} onChange={state(this.handleChange, 'email')}/>
						</li>

						<li>
							<label htmlFor="organization">Your organization</label>
							<input type="text" value={this.state.organization} onChange={state(this.handleChange, 'organitation')}/>
						</li>
						<li className={CSS.full}>
							<label htmlFor="message">Your Message</label>
							<textarea name="message" value={this.state.message} onChange={state(this.handleChange, 'message')}/>
						</li>
						<li className={CSS.full}>
							<div className={CSS.submitWrap}>
								<input className="btn btn-primary" type="submit" value="Submit"/>
							</div>
						</li>
					</ul>
				</form>
			</div>
		);
	}
}