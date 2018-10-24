import React from 'react';
import PropTypes from 'prop-types';
import {noop} from 'redux-saga/utils';
import {BeatLoader} from 'react-spinners';

const Button = ({text, onClick, loading, className, type = 'button'}) => {
	if (loading) {
		className += ' btn-loading';
	}

	const spinnerColor = className.includes('btn-primary') ? '#FFF' : '#FFF';

	return (
		// eslint-disable-next-line react/button-has-type
		<button className={className} type={type} onClick={onClick}>
			{loading ? <BeatLoader size={15} sizeUnit="px" loading={loading} color={spinnerColor}/> : text}
		</button>
	);
};

Button.propTypes = {
	text: PropTypes.string,
	onClick: PropTypes.func,
	loading: PropTypes.bool,
	className: PropTypes.string,
	type: PropTypes.string
};

Button.defaultProps = {
	text: null,
	onClick: noop,
	loading: false,
	className: 'btn btn-primary',
	type: 'button'
};

export default Button;
