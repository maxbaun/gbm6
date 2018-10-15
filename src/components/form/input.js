import React from 'react';
import PropTypes from 'prop-types';

import {key, input, noop} from '../utils/componentHelpers';
import CSS from './forms.module.scss';

const Input = ({classname, styles, type, name, value, onChange, autocomplete, placeholder, onKeyUp, onFocus, onBlur, readOnly, tabIndex}) => {
	return (
		<div className={CSS.inputWrap}>
			<label className={CSS.label}>{placeholder}</label>
			<input
				className={classname === '' ? CSS.input : classname}
				autoComplete={autocomplete}
				style={styles || null}
				type={type}
				name={name || null}
				value={value || ''}
				readOnly={readOnly ? 'readonly' : ''}
				tabIndex={tabIndex}
				onChange={input(onChange)}
				onKeyUp={key(onKeyUp)}
				onFocus={onFocus || null}
				onBlur={onBlur || null}
			/>
		</div>
	);
};

Input.propTypes = {
	type: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	onKeyUp: PropTypes.func,
	readOnly: PropTypes.bool,
	autocomplete: PropTypes.bool,
	classname: PropTypes.string,
	styles: PropTypes.object,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	tabIndex: PropTypes.number
};

Input.defaultProps = {
	type: 'text',
	name: 'text',
	placeholder: 'Text Box',
	readOnly: false,
	autocomplete: 'off',
	classname: '',
	styles: {},
	tabIndex: 1,
	onChange: noop,
	onKeyUp: noop,
	onFocus: noop,
	onBlur: noop
};

export default Input;
