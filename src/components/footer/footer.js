import React from 'react';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {Map} from 'immutable';
import {connect} from 'react-redux';

import CSS from './footer.module.scss';
import {selectors as stateSelectors} from '../../ducks/state';
import {selectors as platformSelectors} from '../../ducks/platforms';
import {innerHtml} from '../../utils/componentHelpers';

const mapStateToProps = state => ({
	state: stateSelectors.getState(state),
	settings: platformSelectors.getWebsiteSettings(state)
});

const Footer = ({settings, state}) => {
	return (
		<footer style={{opacity: state.get('pageTransitioning') ? 0 : 1}} className={CSS.footer}>
			<div className={CSS.inner}>
				<div className="container">
					{/* eslint-disable-next-line react/no-danger */}
					<div dangerouslySetInnerHTML={innerHtml(settings.getIn(['fields', 'copyright']))} className={CSS.copy}/>
				</div>
			</div>
		</footer>
	);
};

Footer.propTypes = {
	settings: ImmutableProptypes.map,
	state: ImmutableProptypes.map
};

Footer.defaultProps = {
	settings: Map(),
	state: Map()
};

export default connect(mapStateToProps)(Footer);
