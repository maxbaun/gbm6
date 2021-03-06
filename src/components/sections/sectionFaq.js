import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {List, Map} from 'immutable';
import {Link} from 'react-router-dom';

import CSS from './sectionFaq.module.scss';
import HeadingBrand from '../headingBrand/headingBrand';
import Image from '../common/image';
import SectionLines from '../common/sectionLines';
import Markdown from '../common/markdown';
import {click} from '../../utils/componentHelpers';

export default class SectionFaq extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeIndex: 0
		};

		this.toggleFaq = this.toggleFaq.bind(this);
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

	toggleFaq(activeIndex) {
		if (this.state.activeIndex === activeIndex) {
			activeIndex = -1;
		}

		this.handleFaqChange(activeIndex);
	}

	handleFaqChange(activeIndex) {
		this.setState({activeIndex});
	}

	render() {
		const {heading, layout, allFaqLinkUrl, allFaqLinkText, ctaContent, ctaLinkUrl, ctaLinkText} = this.props;

		const renderAccordion = layout === 'accordion';

		return (
			<div data-section className={CSS.section} data-layout={layout}>
				<div data-clip-target>
					<div className={CSS.overlay}/>
					<SectionLines/>
					<Image background baFixed className={CSS.background} image={this.props.backgroundImage}/>
					<div className="container">
						{heading && heading !== '' ? (
							<div className={CSS.header}>
								<div className="row align-items-end">
									<div className="col-md-6 col-lg-5 offset-lg-1">
										<div className={CSS.heading}>
											<HeadingBrand heading={heading}/>
										</div>
									</div>
									<div className="col-md-6 col-lg-5 offset-lg-1 d-sm-none d-md-block">
										<div className={CSS.allFaqLink}>
											<Link to={allFaqLinkUrl} className={CSS.allLink}>
												{allFaqLinkText}
											</Link>
										</div>
									</div>
								</div>
							</div>
						) : null}
						{renderAccordion ? (
							this.renderAccordionTabs()
						) : (
							<Fragment>
								<div className="d-none d-md-block">{this.renderVerticalTabs()}</div>
								<div className="d-md-none">
									{this.renderAccordionTabs()}
									<div className={CSS.allFaqLink}>
										<Link to={allFaqLinkUrl} className={CSS.allLink}>
											{allFaqLinkText}
										</Link>
									</div>
								</div>
							</Fragment>
						)}
						{ctaContent ? (
							<div className="row">
								<div className="col-md-10 offset-md-1">
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
								<div className={questionCss.join(' ')} onClick={click(this.toggleFaq, index)}>
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
			<div className="row">
				<div className="col-md-6 col-lg-5 offset-lg-1">
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
				<div className="col-md-6 col-lg-5 offset-lg-1 d-sm-none d-md-block">
					<div className={CSS.answer}>
						<Markdown content={this.props.faqs.getIn([this.state.activeIndex, 'fields', 'answer'])}/>
					</div>
				</div>
			</div>
		);
	}
}
