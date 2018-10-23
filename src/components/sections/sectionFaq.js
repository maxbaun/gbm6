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
		allFaqLinkUrl: PropTypes.string,
		allFaqLinkText: PropTypes.string,
		layout: PropTypes.oneOf(['normal', 'accordion']),
		ctaContent: PropTypes.string,
		ctaLinkUrl: PropTypes.string,
		ctaLinkText: PropTypes.string
	};

	static defaultProps = {
		heading: null,
		faqs: List(),
		backgroundImage: Map(),
		allFaqLinkUrl: null,
		allFaqLinkText: 'View all questions',
		layout: 'normal',
		ctaContent: null,
		ctaLinkUrl: null,
		ctaLinkText: null
	};

	handleFaqChange(activeIndex) {
		this.setState({activeIndex});
	}

	render() {
		const {heading, layout, allFaqLinkUrl, allFaqLinkText, ctaContent, ctaLinkUrl, ctaLinkText} = this.props;

		const backgroundStyle = {
			backgroundImage: `url(${this.props.backgroundImage.getIn(['fields', 'file', 'url'])})`
		};

		const renderAccordion = window.innerWidth < responsive.collapse || layout === 'accordion';

		return (
			<div data-section className={CSS.section} data-layout={layout}>
				<div className={CSS.overlay}/>
				<div className={CSS.background} style={backgroundStyle}/>
				<div className={CSS.wrap}>
					<div className={CSS.inner}>
						{heading && heading !== '' ? (
							<div className={CSS.headingRow}>
								<div className={CSS.headingCol}>
									<div className={CSS.heading}>
										<HeadingBrand heading={heading}/>
									</div>
								</div>
								{renderAccordion === false ? (
									<div className={CSS.headingCol}>
										<div className={CSS.allFaqLink}>
											<Link to={allFaqLinkUrl} className={CSS.allLink}>
												{allFaqLinkText}
											</Link>
										</div>
									</div>
								) : null}
							</div>
						) : null}

						{renderAccordion ? this.renderAccordionTabs() : this.renderVerticalTabs()}
						{renderAccordion && allFaqLinkUrl ? (
							<div className={CSS.allFaqLink}>
								<Link to={allFaqLinkUrl} className={CSS.allLink}>
									{allFaqLinkText}
								</Link>
							</div>
						) : null}
						{ctaContent ? (
							<div className={CSS.cta}>
								<div className={CSS.ctaInner}>
									<div className={CSS.ctaContent}>
										<Markdown content={ctaContent}/>
									</div>
									<div className={CSS.ctaButton}>
										<Link to={ctaLinkUrl} className="btn btn-primary">
											{ctaLinkText}
										</Link>
									</div>
								</div>
							</div>
						) : null}
					</div>
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
							<li key={faq.getIn(['fields', 'question'])} className={itemCss.join(' ')}>
								<div className={questionCss.join(' ')} onClick={click(this.handleFaqChange, index)}>
									<span>{faq.getIn(['fields', 'question'])}</span>
								</div>
								<div className={CSS.answer}>
									<Markdown content={faq.getIn(['fields', 'answer'])}/>
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
									<li
										key={faq.getIn(['fields', 'question'])}
										className={questionCss.join(' ')}
										onClick={click(this.handleFaqChange, index)}
									>
										<span>{faq.getIn(['fields', 'question'])}</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className={CSS.col}>
					<div className={CSS.answer}>
						<Markdown content={this.props.faqs.getIn([this.state.activeIndex, 'fields', 'answer'])}/>
					</div>
				</div>
			</div>
		);
	}
}
