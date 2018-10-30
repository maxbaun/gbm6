import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

import CSS from './counters.module.scss';
import InView from '../common/inView';

const Counters = ({counters, hasAppeared}) => {
	counters = counters.split('\n');

	return (
		<ul className={CSS.counterBlocks}>
			{counters.map(counter => {
				const parts = counter.split(':');

				return (
					<li key={parts[0] + parts[2]} className={CSS.counterBlock}>
						<div className={CSS.counter}>
							<h3>
								{hasAppeared ? <CountUp start={0} end={parts[0]} duration={5} delay={1}/> : 0}
								{parts[1]}
							</h3>
							<p>{parts[2]}</p>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

Counters.propTypes = {
	counters: PropTypes.string.isRequired,
	hasAppeared: PropTypes.bool.isRequired
};

export default InView(Counters);
