import React from 'react';
import PropTypes from 'prop-types';

import CSS from './sectionManager.module.scss';

const SectionManager = ({children, template, hasCta}) => {
	const offSet = hasCta ? 1 : 0;
	return (
		<div
			className={CSS.sectionManager}
			data-template={template}
			data-odd={(children.length - offSet) % 2 === 1}
			data-even={(children.length - offSet) % 2 === 0}
		>
			{children}
		</div>
	);
};

SectionManager.propTypes = {
	children: PropTypes.arrayOf(PropTypes.node).isRequired,
	template: PropTypes.string.isRequired,
	hasCta: PropTypes.bool.isRequired
};

export default SectionManager;
