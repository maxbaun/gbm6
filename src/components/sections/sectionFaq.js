import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {List, Map} from 'immutable';
import {Link} from 'react-router-dom';

import CSS from './sectionFaq.module.scss';
import HeadingBrand from '../headingBrand/headingBrand';
import Markdown from '../common/markdown';
import {click} from '../../utils/componentHelpers';
import {responsive} from '../../constants';

export default class SectionFaq extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeIndex: 0
		};

		this.handleFaqChange = this.handleFaqChange.bind(this);
	}

	static propTypes = {
		heading: PropTypes.string,
		faqs: ImmutableProptypes.list,
		backgroundImage: ImmutableProptypes.map,
		state: ImmutableProptypes.map,
		allFaqLink: PropTypes.string,
		allFaqText: PropTypes.string
	};

	static defaultProps = {
		heading: '',
		faqs: List(),
		backgroundImage: Map(),
		state: Map(),
		allFaqLink: '/',
		allFaqText: 'View all questions'
	};

	handleFaqChange(activeIndex) {
		this.setState({activeIndex});
	}

	render() {
		const windowWidth = this.props.state.getIn(['windowSize', 'width']);
		const backgroundStyle = {
			backgroundImage: `url(${this.props.backgroundImage.get('src')})`
		};

		const renderAccordion = windowWidth < responsive.tablet;

		return (
			<div className={CSS.section}>
				<div className={CSS.overlay}/>
				<div className={CSS.background} style={backgroundStyle}/>
				<div className={CSS.inner}>
					<div className={CSS.headingRow}>
						<div className={CSS.headingCol}>
							<div className={CSS.heading}>
								<HeadingBrand heading={this.props.heading}/>
							</div>
						</div>
						{renderAccordion === false ? (
							<div className={CSS.headingCol}>
								<div className={CSS.allFaqLink}>
									<Link to={this.props.allFaqLink} className={CSS.allLink}>
										{this.props.allFaqText}
									</Link>
								</div>
							</div>
						) : null}
					</div>

					{renderAccordion ? this.renderAccordionTabs() : this.renderVerticalTabs()}
					{renderAccordion ? (
						<div className={CSS.allFaqLink}>
							<Link to={this.props.allFaqLink} className={CSS.allLink}>
								{this.props.allFaqText}
							</Link>
						</div>
					) : null}
				</div>
			</div>
		);
	}

	renderAccordionTabs() {
		return (
			<div className={CSS.accordion}>
				<ul className={CSS.accordionList}>
					{this.props.faqs.map((faq, index) => {
						const itemCss = [CSS.accordionItem];
						const questionCss = [CSS.question];

						if (index === this.state.activeIndex) {
							itemCss.push(CSS.accordionItemActive);
							questionCss.push(CSS.questionActive);
						}
						return (
							<li key={faq.get('question')} className={itemCss.join(' ')}>
								<div className={questionCss.join(' ')} onClick={click(this.handleFaqChange, index)}>
									<span>{faq.get('question')}</span>
								</div>
								<div className={CSS.answer}>
									<Markdown content={faq.get('answer')}/>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}

	renderVerticalTabs() {
		return (
			<div className={CSS.row}>
				<div className={CSS.col}>
					<div className={CSS.questions}>
						<ul className={CSS.questionList}>
							{this.props.faqs.map((faq, index) => {
								const questionCss = [CSS.question];

								if (index === this.state.activeIndex) {
									questionCss.push(CSS.questionActive);
								}

								return (
									<li key={faq.get('question')} className={questionCss.join(' ')} onClick={click(this.handleFaqChange, index)}>
										<span>{faq.get('question')}</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className={CSS.col}>
					<div className={CSS.answer}>
						<Markdown content={this.props.faqs.getIn([this.state.activeIndex, 'answer'])}/>
					</div>
				</div>
			</div>
		);
	}
}
