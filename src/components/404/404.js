import React from 'react';

import CSS from './notFound.module.scss';

const NotFound = () => {
	return (
		<div className={CSS.wrap}>
			<div className="container">
				<div className={CSS.inner}>
					<h3 className={CSS.alert}>not found</h3>
					<h1 className={CSS.four}>
						<span>4</span>
						<span>0</span>
						<span>4</span>
					</h1>
					<h2 className={CSS.message}>we are sorry, but the page you requested was not found</h2>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
