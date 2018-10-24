import React from 'react';
import PropTypes from 'prop-types';

import CSS from './hamburg.module.scss';
import {noop} from '../../utils/componentHelpers';

const Hamburg = ({onClick, active}) => {
	const wrapCss = [CSS.hamburg];

	if (active) {
		wrapCss.push(CSS.hamburgActive);
	}

	return (
		<div className={wrapCss.join(' ')} onClick={onClick}>
			<div className={CSS.box}>
				<span className="fas fa-bars"/>
			</div>
		</div>
	);
};

Hamburg.propTypes = {
	onClick: PropTypes.func,
	active: PropTypes.bool.isRequired
};

Hamburg.defaultProps = {
	onClick: noop
};

export default Hamburg;
