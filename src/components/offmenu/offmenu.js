import React from 'react';
import PropTypes from 'prop-types';

import CSS from './offmenu.module.scss';

const Offmenu = ({children, active, position, onToggle, fog, theme, closePosition}) => {
	let offmenuCSS = theme && theme !== '' ? CSS[theme] : CSS.offmenu;
	let compileWrapCSS = [CSS.wrap, active ? CSS.active : CSS.inactive].join(' ');

	return (
		<div className={offmenuCSS}>
			{fog ? <div className={active ? [CSS.fog, CSS.fogActive].join(' ') : CSS.fog} onClick={onToggle}/> : null}
			<div className={compileWrapCSS} data-position={position}>
				<div className={CSS.inner}>
					<div className={CSS.header}>
						<div className={CSS.close} data-position={closePosition} onClick={onToggle}>
							<span className="fas fa-times"/>
						</div>
					</div>
					<div className={CSS.content}>{children}</div>
				</div>
			</div>
		</div>
	);
};

Offmenu.propTypes = {
	active: PropTypes.bool.isRequired,
	children: PropTypes.element.isRequired,
	position: PropTypes.string.isRequired,
	onToggle: PropTypes.func.isRequired,
	fog: PropTypes.bool,
	theme: PropTypes.string,
	closePosition: PropTypes.string
};

Offmenu.defaultProps = {
	fog: true,
	theme: '',
	closePosition: 'top'
};

export default Offmenu;
