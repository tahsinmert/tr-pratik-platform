import { cities } from '$lib/data/cities';
import { slugify } from '$lib/utils';

const STATIC_PATHS = ['/', '/hesapla/', '/hesapla/yakit-tuketimi/'];
const TOP_ORIGINS = [
	'İstanbul',
	'Ankara',
	'İzmir',
	'Bursa',
	'Antalya',
	'Adana',
	'Konya',
	'Gaziantep',
	'Şanlıurfa',
	'Kocaeli'
];

// Popular loan amounts for credit calculator
const LOAN_AMOUNTS = [10000, 50000, 100000, 500000, 1000000];
// Popular loan terms (months)
const LOAN_TERMS = [12, 24, 36];

// Popular VAT rates
const VAT_RATES = [1, 10, 20];

const CACHE_CONTROL = 'public, max-age=0, s-maxage=86400, stale-while-revalidate=43200';

/**
 * @param {string} value
 */
function xmlEscape(value) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

/**
 * @param {string} loc
 * @param {string} lastmod
 */
function buildUrlEntry(loc, lastmod) {
	return `<url><loc>${xmlEscape(loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`;
}

export async function GET({ url }) {
	const origin = url.origin ?? 'https://tr-pratik.com';
	const today = new Date().toISOString().split('T')[0];

	const entries = [];

	for (const path of STATIC_PATHS) {
		const loc = `${origin}${path}`;
		entries.push(buildUrlEntry(loc, today));
	}

	for (const originCity of TOP_ORIGINS) {
		for (const destinationCity of cities) {
			if (originCity === destinationCity) continue;

			const path = `/hesapla/${slugify(originCity)}-${slugify(destinationCity)}-yakit-hesaplama/`;
			const loc = `${origin}${path}`;
			entries.push(buildUrlEntry(loc, today));
		}
	}

	// Credit Calculator Routes
	for (const amount of LOAN_AMOUNTS) {
		for (const term of LOAN_TERMS) {
			const path = `/hesapla/kredi/${amount}-tl-${term}-ay-kredi-hesaplama/`;
			const loc = `${origin}${path}`;
			entries.push(buildUrlEntry(loc, today));
		}
	}

	// VAT (KDV) Routes - Generic calculation pages
	entries.push(buildUrlEntry(`${origin}/hesapla/kdv/`, today));
	entries.push(buildUrlEntry(`${origin}/hesapla/kdv-hesaplama/`, today));
	entries.push(buildUrlEntry(`${origin}/hesapla/kdv-hesapla/`, today));

	// VAT (KDV) Routes - Rate-specific pages
	for (const rate of VAT_RATES) {
		const path = `/hesapla/kdv/yuzde-${rate}-kdv-hesaplama/`;
		const loc = `${origin}${path}`;
		entries.push(buildUrlEntry(loc, today));
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': CACHE_CONTROL
		}
	});
}

