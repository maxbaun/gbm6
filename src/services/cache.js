import {fromJS, Map} from 'immutable';

const isDev = process.env.NODE_ENV !== 'production';

const storageKey = 'gbm6';
const timestampKey = 'gbm6timestamp';
const expireTime = 8.64e7; // Cache expires after 1 day

const cache = getCache();

export function setData({key, data}) {
	let cachedStorage = cache;

	cachedStorage = cachedStorage.set(key, fromJS(data));

	window.localStorage.setItem(storageKey, JSON.stringify(cachedStorage.toJS()));
	window.localStorage.setItem(timestampKey, new Date().getTime());
}

export function getData(key) {
	return cache.get(key);
}

export function getCache() {
	// If local storage is not defined or we are in development mode, then return an empty cache
	if (!window.localStorage || isDev) {
		return Map();
	}

	const cachedStorage = window.localStorage.getItem(storageKey);
	const cachedTime = window.localStorage.getItem(timestampKey);

	const now = new Date().getTime();
	const timeDiff = now - cachedTime;

	// If the cache is older than the expireTime, then reset the cache
	if (timeDiff > expireTime) {
		resetCache();
	}

	if (!cachedStorage) {
		return Map();
	}

	return fromJS(JSON.parse(cachedStorage));
}

export function resetCache() {
	console.info('Resetting Cache...');
	window.localStorage.removeItem(storageKey);
	window.localStorage.removeItem(timestampKey);
}
