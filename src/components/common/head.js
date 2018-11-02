import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {fromJS, Map, List} from 'immutable';

import {site} from '../../constants';

function getDerivedProps(props) {
	return props
		.reduce((map, prop, key) => {
			const isSet = Boolean(prop && prop !== '');

			if (key === 'title' && prop && prop !== '') {
				const title = isSet ? prop : site.siteTitle;
				const formatted = site.titleFormat.replace('%title%', title);
				return map.merge(
					fromJS({
						title: formatted,
						'og:title': formatted,
						'twitter:title': formatted
					})
				);
			}

			if (key === 'image') {
				return map.merge(
					fromJS({
						'og:image': isSet ? prop : `${site.publicUrl}/gbm6.jpg`,
						'twitter:image': isSet ? prop : `${site.publicUrl}/gbm6.jpg`
					})
				);
			}

			if (key === 'url') {
				return map.merge(
					fromJS({
						'og:url': isSet ? prop : site.siteurl,
						'twitter:url': isSet ? prop : site.siteurl
					})
				);
			}

			if (key === 'description') {
				return map.merge(
					fromJS({
						'og:description': isSet ? prop : site.siteDescription,
						'twitter:description': isSet ? prop : site.siteDescription
					})
				);
			}

			return map;
		}, Map())
		.reduce((list, prop, key) => {
			if (key === 'title') {
				return list.push(<title key="titleMetaProp">{prop}</title>);
			}

			return list.push(
				fromJS({
					content: prop,
					property: key
				})
			);
		}, List());
}

const Head = props => {
	const derivedProps = getDerivedProps(fromJS(props));
	return (
		<Helmet>
			{derivedProps.map(prop => {
				if (!prop.get) {
					return prop;
				}

				const props = prop.get('property').includes('og:') ?
					{
						property: prop.get('property')
					  } :
					{
						name: prop.get('property')
					  };

				return <meta key={prop.get('name')} {...props} content={prop.get('content')}/>;
			})}
		</Helmet>
	);
};

Head.propTypes = {
	location: PropTypes.object.isRequired
};

export default Head;
