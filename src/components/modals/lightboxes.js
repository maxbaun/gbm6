import React from 'react';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fromJS} from 'immutable';

import {selectors as stateSelectors, actions as stateActions} from '../../ducks/state';
import {click, noop} from '../../utils/componentHelpers';
import Lightbox from './lightbox';

const mapStateToProps = state => ({
	state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		{
			...stateActions
		},
		dispatch
	)
});

const Lightboxes = ({state, actions}) => {
	return state.get('lightboxes').map(lightbox => {
		return (
			<Lightbox
				key={lightbox.get('id')}
				active={state.getIn(['offmenu', lightbox.get('id')])}
				images={lightbox.get('images')}
				onClose={click(actions.offmenuHide, lightbox.get('id'))}
			/>
		);
	});
};

Lightboxes.propTypes = {
	state: ImmutableProptypes.map,
	actions: PropTypes.objectOf(PropTypes.func)
};

Lightboxes.defaultProps = {
	state: fromJS({
		lightboxes: []
	}),
	actions: {
		offmenuHide: noop
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lightboxes);
