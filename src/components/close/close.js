import React from 'react';
import PropTypes from 'prop-types';

import CSS from './close.module.scss';
import {noop} from '../../utils/componentHelpers';

const Close = ({size, backgroundColor, onClick: handleClick}) => {
	const wrap = {
		position: 'absolute',
		height: size - 1,
		width: size - 1
	};

	const lineStyle = {
		height: size,
		backgroundColor
	};

	return (
		<div className={CSS.wrap} style={wrap} onClick={handleClick}>
			<span className={CSS.before} style={lineStyle}/>
			<span className={CSS.after} style={lineStyle}/>
		</div>
	);
};

Close.propTypes = {
	size: PropTypes.number,
	backgroundColor: PropTypes.string,
	onClick: PropTypes.func
};

Close.defaultProps = {
	size: 33,
	backgroundColor: 'white',
	onClick: noop
};

export default Close;
