import ReactGA from 'react-ga';

export function analytics(type = 'event', data) {
	switch (type) {
		case 'initialize':
			return ReactGA.initialize(data, {
				cookieDomain: 'auto',
				debug: false
			});

		case 'page':
			return ReactGA.pageview(data);

		default:
			return ReactGA.pageview(data);
	}
}
