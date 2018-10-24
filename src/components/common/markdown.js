import React from 'react';
import PropTypes from 'prop-types';
import Remarkable from 'remarkable';

import {innerHtml} from '../../utils/componentHelpers';

const md = new Remarkable({
	html: true
});

const Markdown = ({content, ...props}) => {
	const parsed = md.render(content);

	// eslint-disable-next-line react/no-danger
	return <div dangerouslySetInnerHTML={innerHtml(parsed)} {...props}/>;
};

Markdown.propTypes = {
	content: PropTypes.string.isRequired
};

export default Markdown;
