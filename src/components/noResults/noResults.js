import React from 'react';
import PropTypes from 'prop-types';

import CSS from './noResults.module.scss';

const NoResults = ({title}) => {
	return (
		<div className={CSS.wrap}>
			<h3 className={CSS.title}>
				No Results for: <span className={CSS.accent}>{title}</span>
			</h3>
		</div>
	);
};

NoResults.propTypes = {
	title: PropTypes.string
};

NoResults.defaultProps = {
	title: null
};

export default NoResults;
