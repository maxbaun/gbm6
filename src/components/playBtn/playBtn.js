import React from 'react';
import PropTypes from 'prop-types';

import CSS from './playBtn.module.scss';
import {noop} from '../../utils/componentHelpers';

const PlayBtn = ({size, onClick}) => {
	const style = {
		width: size,
		height: size
	};

	const iconStyle = {
		fontSize: size / 3,
		marginLeft: 5
	};

	return (
		<div className={CSS.play} style={style} onClick={onClick}>
			<span className="fas fa-play" style={iconStyle}/>
		</div>
	);
};

PlayBtn.propTypes = {
	size: PropTypes.number,
	onClick: PropTypes.func
};

PlayBtn.defaultProps = {
	size: 75,
	onClick: noop
};

export default PlayBtn;
