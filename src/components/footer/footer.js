import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {Map} from 'immutable';

import CSS from './footer.module.scss';
import {innerHtml} from '../../utils/componentHelpers';

const Footer = ({copyright, state}) => {
	return (
		<footer style={{opacity: state.get('pageTransitioning') ? 0 : 1}} className={CSS.footer}>
			<div className={CSS.inner}>
				<div className="container">
					{/* eslint-disable-next-line react/no-danger */}
					<div dangerouslySetInnerHTML={innerHtml(copyright)} className={CSS.copy}/>
				</div>
			</div>
		</footer>
	);
};

Footer.propTypes = {
	copyright: PropTypes.string,
	state: ImmutableProptypes.map
};

Footer.defaultProps = {
	copyright: '',
	state: Map()
};

export default Footer;
