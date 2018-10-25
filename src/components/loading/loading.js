import React from 'react';
import {BeatLoader} from 'react-spinners';

import CSS from './loading.module.scss';

const Loading = ({loading}) => {
	const loadingCss = [CSS.loading];

	if (loading) {
		loadingCss.push(CSS.loadingActive);
	}

	return (
		<div className={loadingCss.join(' ')}>
			<div className={CSS.loadingInner}>
				<BeatLoader size={30} sizeUnit="px" loading={loading} color="#FFF"/>
			</div>
		</div>
	);
};

export default Loading;
