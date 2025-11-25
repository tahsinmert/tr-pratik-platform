/**
 * Returns current average fuel prices in Turkey.
 * In production we can replace this static payload with a cheerio-based scraper
 * or a trusted fuel price API integration.
 */
export function getCurrentFuelPrices() {
	return {
		benzin: 42.5,
		motorin: 43.1,
		lpg: 25.5
	};
}


