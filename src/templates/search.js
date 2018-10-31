import React, {Component} from 'react';
import * as ImmutabelProptypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {selectors as searchSelectors, actions as searchActions} from '../ducks/search';
import {selectors as stateSelectors, actions as stateActions} from '../ducks/state';

import {unique, isLoading} from '../utils/componentHelpers';
import {analytics} from '../utils/trackingHelpers';
import SectionCta from '../components/sections/sectionCta';
import SectionSearch from '../components/sections/sectionSearch';
import PageWrapper from '../components/pageWrapper/pageWrapper';
import Head from '../components/common/head';

const mapStateToProps = state => ({
	search: searchSelectors.getSearch(state),
	state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		{
			...searchActions,
			...stateActions
		},
		dispatch
	)
});

class SearchTemplate extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();

		this.getSearchQuery = this.getSearchQuery.bind(this);
	}

	static propTypes = {
		state: ImmutabelProptypes.map.isRequired,
		search: ImmutabelProptypes.list,
		match: PropTypes.object.isRequired,
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		location: PropTypes.object.isRequired
	};

	static defaultProps = {
		search: List()
	};

	componentDidMount() {
		this.getSearch();
		this.locationChanged();
		this.handleAnalytics();
	}

	componentDidUpdate(prevProps) {
		// If the search param has changed, get the new page
		if (prevProps.match.params.search !== this.props.match.params.search) {
			this.getSearch();
			this.locationChanged();
			this.handleAnalytics();
		}
	}

	handleAnalytics() {
		analytics('page', this.props.location.pathname);
	}

	locationChanged() {
		window.scrollTo(0, 0);
	}

	getSearch() {
		this.props.actions.searchGet({
			payload: {
				search: this.props.match.params.search
			},
			fetch: this.fetch
		});
	}

	getSearchQuery() {
		return this.props.match.params.search;
	}

	render() {
		const loading = isLoading(this.fetch, this.props.state);

		if (typeof loading === 'undefined' || loading) {
			return null;
		}

		return (
			<PageWrapper>
				<Head title={`Search For ${this.getSearchQuery()}`} location={this.props.location} url={window.location.href}/>
				<SectionSearch search={this.props.search} query={this.getSearchQuery()} loading={loading || false}/>
				<SectionCta/>
			</PageWrapper>
		);
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SearchTemplate)
);
