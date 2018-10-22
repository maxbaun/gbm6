const isDev = process.env.NODE_ENV;

module.exports = {
	spaceId: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
	accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
	shouldCache: !isDev,
	responsive: {
		mobile: 576,
		tabletMin: 577,
		tablet: 768,
		collapseMin: 799,
		collapse: 800,
		desktopMin: 991,
		desktop: 992,
		widescreen: 1200
	}
};
