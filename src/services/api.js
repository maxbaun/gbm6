import * as contentful from 'contentful';

import Constants from '../constants';

const ContenfulClient = contentful.createClient({
	space: Constants.spaceId,
	accessToken: Constants.accessToken
});

export async function getPages({query = {}}) {
	try {
		let res = await ContenfulClient.getEntries({
			content_type: 'page', // eslint-disable-line camelcase,
			include: 10,
			...query
		});

		// @TODO: Cache pages

		// if trying to get a page and it is not found, try to get the post by slug
		if (query['fields.slug'] && res.items.length === 0) {
			res = await ContenfulClient.getEntries({
				content_type: 'post', // eslint-disable-line camelcase,
				include: 10,
				...query
			});
		}

		return res.items;
	} catch (error) {
		return error;
	}
}

export async function getPlatforms() {
	try {
		const res = await ContenfulClient.getEntries({
			content_type: 'platforms' // eslint-disable-line camelcase,
		});

		// @TODO: Cache platforms

		return res.items;
	} catch (error) {
		return error;
	}
}

export async function getMenus() {
	try {
		const res = await ContenfulClient.getEntries({
			content_type: 'menu' // eslint-disable-line camelcase
		});

		// @TODO: Cache menus here

		return res.items;
	} catch (error) {
		return error;
	}
}

export async function getVideos({query = {}}) {
	try {
		const res = await ContenfulClient.getEntries({
			content_type: 'portfolio', // eslint-disable-line camelcase
			...query
		});

		// @TODO: Cache portfolio items here

		return res;
	} catch (error) {
		return error;
	}
}

export async function search({query}) {
	try {
		const titleRes = await ContenfulClient.getEntries({
			content_type: 'portfolio', // eslint-disable-line camelcase
			...query.title
		});

		const descriptionRes = await ContenfulClient.getEntries({
			content_type: 'portfolio', // eslint-disable-line camelcase
			...query.description
		});

		const textRes = await ContenfulClient.getEntries({
			content_type: 'portfolio', // eslint-disable-line camelcase
			...query.text
		});

		const res = [...titleRes.items, ...descriptionRes.items, ...textRes.items];

		return res;
	} catch (error) {
		return error;
	}
}
