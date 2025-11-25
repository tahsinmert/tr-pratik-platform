import { cities } from '$lib/data/cities';

/** @type {Record<string, string>} */
const charMap = {
	ç: 'c',
	Ç: 'c',
	ğ: 'g',
	Ğ: 'g',
	ı: 'i',
	İ: 'i',
	ö: 'o',
	Ö: 'o',
	ş: 's',
	Ş: 's',
	ü: 'u',
	Ü: 'u'
};

/**
 * @param {string} text
 */
export function slugify(text = '') {
	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.split('')
		.map((char) => charMap[char] ?? char)
		.join('')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.trim();
}

const MIN_DISTANCE = 200;
const MAX_DISTANCE = 1500;

/**
 * @param {string} value
 */
function hashString(value) {
	let hash = 0;

	for (const char of value) {
		hash = (hash << 5) - hash + char.charCodeAt(0);
		hash |= 0;
	}

	return hash;
}

/**
 * @param {string} origin
 * @param {string} destination
 */
export function getDistance(origin, destination) {
	if (!origin || !destination) return 0;

	const originSlug = slugify(origin);
	const destinationSlug = slugify(destination);

	if (originSlug === destinationSlug) return 0;

	const seed = `${originSlug}-${destinationSlug}`;
	const hashed = Math.abs(hashString(seed));
	const span = MAX_DISTANCE - MIN_DISTANCE + 1;

	return MIN_DISTANCE + (hashed % span);
}

/**
 * @param {string} slug
 */
export function findCityBySlug(slug) {
	return cities.find((city) => slugify(city) === slug);
}

