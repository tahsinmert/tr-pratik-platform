import { error } from '@sveltejs/kit';
import { cityCoordinates } from '$lib/data/cities';
import { findCityBySlug, slugify } from '$lib/utils';
import { getCurrentFuelPrices } from '$lib/services/fuelPrices';

export const ssr = true;

const ROUTE_SUFFIX = '-yakit-hesaplama';
const FUEL_DEFAULTS = {
	fuelPrice: 43.5,
	consumption: 6.5
};

/**
 * @param {string | undefined} slug
 */
function parseSlug(slug) {
	if (!slug || !slug.endsWith(ROUTE_SUFFIX)) {
		return null;
	}

	const base = slug.slice(0, -ROUTE_SUFFIX.length);
	const separatorIndex = base.indexOf('-');

	if (separatorIndex === -1) {
		return null;
	}

	const origin = base.slice(0, separatorIndex);
	const destination = base.slice(separatorIndex + 1);

	if (!origin || !destination) {
		return null;
	}

	return { originSlug: origin, destinationSlug: destination };
}

/**
 * @param {{ lat: number; lon: number }} originCoords
 * @param {{ lat: number; lon: number }} destinationCoords
 * @param {typeof fetch} fetchFn
 */
async function fetchDistanceInKm(originCoords, destinationCoords, fetchFn) {
	const coords = `${originCoords.lon},${originCoords.lat};${destinationCoords.lon},${destinationCoords.lat}`;
	const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=false&steps=false`;
	const response = await fetchFn(url);

	if (!response.ok) {
		throw new Error('OSRM yanıtı alınamadı');
	}

	const payload = await response.json();
	const meters = payload?.routes?.[0]?.distance;

	if (!meters) {
		throw new Error('OSRM mesafesi bulunamadı');
	}

	return meters / 1000;
}

export async function load({ params, url, fetch }) {
	const parsed = parseSlug(params.slug);

	if (!parsed) {
		throw error(404, 'Geçersiz rota slugı');
	}

	const originName = findCityBySlug(parsed.originSlug);
	const destinationName = findCityBySlug(parsed.destinationSlug);

	if (!originName || !destinationName) {
		throw error(404, 'Şehirler bulunamadı');
	}

	const originCoords = cityCoordinates[originName];
	const destinationCoords = cityCoordinates[destinationName];

	if (!originCoords || !destinationCoords) {
		throw error(404, 'Koordinat bilgisi eksik');
	}

	let distanceKm;

	try {
		distanceKm = await fetchDistanceInKm(originCoords, destinationCoords, fetch);
	} catch (err) {
		console.error('OSRM distance error', err);
		throw error(404, 'Mesafe hesaplanamadı');
	}

	const roundedDistance = Math.round(distanceKm * 10) / 10;
	const fuelPrices = getCurrentFuelPrices();
	const defaultFuelPrice = fuelPrices?.motorin ?? FUEL_DEFAULTS.fuelPrice;
	const year = new Date().getFullYear();
	const originUrl = url.origin ?? '';
	const canonicalPath = `/hesapla/${params.slug}/`;
	const canonical = originUrl ? `${originUrl}${canonicalPath}` : canonicalPath;

	const title = `${originName} ile ${destinationName} Arası Yakıt Tüketimi Hesaplama (${year})`;
	const description = `${originName} ${destinationName} arası kaç km? Güncel akaryakıt fiyatlarıyla seyahat yakıt masrafınızı hemen hesaplayın.`;

	return {
		trip: {
			originName,
			destinationName,
			originSlug: slugify(originName),
			destinationSlug: slugify(destinationName)
		},
		distanceKm: roundedDistance,
		coordinates: {
			origin: originCoords,
			destination: destinationCoords
		},
		defaults: {
			...FUEL_DEFAULTS,
			fuelPrice: defaultFuelPrice,
			distance: roundedDistance
		},
		fuelPrices,
		seo: {
			title,
			description,
			canonical,
			schema: {
				'@context': 'https://schema.org',
				'@type': 'SoftwareApplication',
				name: `${originName} - ${destinationName} Yakıt Hesaplayıcı`,
				applicationCategory: 'UtilitiesApplication',
				operatingSystem: 'Any',
				offers: {
					'@type': 'Offer',
					price: '0',
					priceCurrency: 'TRY'
				},
				audience: {
					'@type': 'Audience',
					audienceType: 'Sürücüler'
				},
				url: canonical,
				creator: {
					'@type': 'Organization',
					name: 'TR-Pratik'
				}
			}
		}
	};
}

