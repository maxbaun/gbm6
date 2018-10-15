const isDev = process.env.NODE_ENV;

module.exports = {
	spaceId: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
	accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
	shouldCache: !isDev
};
