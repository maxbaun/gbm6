import React from 'react';
import PropTypes from 'prop-types';

import CSS from './footer.module.scss';
import {innerHtml} from '../../utils/componentHelpers';

const Footer = ({copyright}) => {
	return (
		<footer className={CSS.footer}>
			<div className="container">
				<div className={CSS.inner}>
					{/* eslint-disable-next-line react/no-danger */}
					<div dangerouslySetInnerHTML={innerHtml(copyright)} className={CSS.copy}/>
				</div>
			</div>
		</footer>
	);
};

Footer.propTypes = {
	copyright: PropTypes.string
};

Footer.defaultProps = {
	copyright: ''
};

export default Footer;
