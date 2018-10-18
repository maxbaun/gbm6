import React from 'react';

import CSS from './sliderNav.module.scss';

const SliderNav = () => {
	return (
		<div className={CSS.sliderNav}>
			<div className={CSS.inner}>
				<div className={['swiper-button-prev', CSS.prev].join(' ')}>
					<span className="fas fa-arrow-left"/>
				</div>
				<div className={['swiper-button-next', CSS.next].join(' ')}>
					<span className="fas fa-arrow-right"/>
				</div>
			</div>
		</div>
	);
};

export default SliderNav;
