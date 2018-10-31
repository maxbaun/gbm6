import * as utils from '../utils/duckHelpers';

export const types = {
	CACHE_MENUS_SET: 'CACHE_MENUS_SET',
	CACHE_PAGES_SET: 'CACHE_PAGES_SET',
	CACHE_VIDEOS_SET: 'CACHE_VIDEOS_SET',
	CACHE_UPDATE: 'CACHE_UPDATE',
	CACHE_RESET: 'CACHE_RESET',
	CACHE_PLATFORMS_SET: 'CACHE_PLATFORMS_SET'
};

export const actions = {
	cacheReset: obj => utils.action(types.CACHE_RESET, obj)
};
