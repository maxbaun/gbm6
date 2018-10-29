import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';

import CSS from './sectionSearch.module.scss';
import SectionFeaturedEvents from './sectionFeaturedEvents';
import NoResults from '../noResults/noResults';

const SectionSearch = ({query, search, loading}) => {
	let content = <SectionFeaturedEvents title={`Search Results For: ${query}`} videos={search} perGroup={search.count()}/>;

	if ((!search || search.count() === 0) && !loading) {
		content = <NoResults title={query}/>;
	}

	return (
		<div className={CSS.section}>
			<div className="container">
				<div className={CSS.inner}>{content}</div>
			</div>
		</div>
	);
};

SectionSearch.propTypes = {
	query: PropTypes.string,
	search: ImmutableProptypes.list.isRequired,
	loading: PropTypes.bool.isRequired
};

SectionSearch.defaultProps = {
	query: 'Search'
};

export default SectionSearch;
