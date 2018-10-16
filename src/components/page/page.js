import React from 'react';
import * as ImmutabelProptypes from 'react-immutable-proptypes';
import {fromJS} from 'immutable';

import Hero from '../hero/hero';

import HeroImg from '../../img/Hero-bg-1.png';

const HeroContent = `
# <span style="color:white;text-shadow:6px 6px 25px rgba(0,145,214,0.7);">18 Years of </span>
# <span style="color:#C5FC01;text-shadow:6px 6px 25px rgba(0,145,214,0.7);">Making People Happy</span>
### Legendary **Event Design & Execution**


`;

const Page = ({state}) => {
	return (
		<div>
			<Hero
				doubleAngle
				scrollTo="#next"
				scrollColor="#0091D6"
				imageCss={{
					backgroundColor: '#0091D6',
					backgroundBlendMode: 'luminosity',
					backgroundSize: 'cover',
					backgroundPosiition: 'top center'
				}}
				image={fromJS({src: HeroImg})}
				state={state}
				content={HeroContent}
			/>
			<div id="next">next div</div>
		</div>
	);
};

Page.propTypes = {
	state: ImmutabelProptypes.map.isRequired
};

Page.defaultProps = {};

export default Page;
