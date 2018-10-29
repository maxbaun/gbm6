import React from 'react';
import PropTypes from 'prop-types';

import CSS from './pageWrapper.module.scss';

const Page = ({children}) => {
	return <div className={CSS.pageWrapper}>{children}</div>;
};

Page.propTypes = {
	children: PropTypes.node.isRequired
};

export default Page;
