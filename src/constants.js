const isDev = process.env.NODE_ENV;

module.exports = {
	spaceId: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
	accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
	shouldCache: !isDev,
	videosPerPage: process.env.REACT_APP_VIDEOS_PER_PAGE ? parseInt(process.env.REACT_APP_VIDEOS_PER_PAGE, 10) : 10,
	portfolioBase: process.env.REACT_APP_PORTFOLIO_BASE || 'projects',
	site: {
		publicPath: process.env.REACT_APP_PUBLIC_PATH,
		titleFormat: process.env.REACT_APP_SITE_TITLE_FORMAT,
		siteTitle: process.env.REACT_APP_SITE_TITLE,
		siteDescription: process.env.REACT_APP_SITE_DESCRIPTION,
		siteUrl: process.env.REACT_APP_SITE_URL,
		ogTitle: process.env.REACT_APP_OG_TITLE,
		ogDescription: process.env.REACT_APP_OG_DESCRIPTION,
		ogSiteName: process.env.REACT_APP_OG_SITE_NAME,
		twitterTitle: process.env.REACT_APP_TWITTER_TITLE,
		twitterDescription: process.env.REACT_APP_TWITTER_DESCRIPTION
	},
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
