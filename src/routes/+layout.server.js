export const ssr = true;

const siteBaseUrl = 'https://tr-pratik.vercel.app';

/**
 * @param {string | undefined} pathname
 */
function normalizePath(pathname) {
	if (!pathname || pathname === '/') {
		return '/';
	}

	return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function load({ url }) {
	const origin = url.origin || siteBaseUrl;
	const currentPath = normalizePath(url.pathname);
	const canonical = new URL(currentPath, origin).toString();

	return {
		site: {
			name: 'TR-Pratik',
			baseUrl: origin,
			currentPath,
			canonical,
			tagline: 'Türkiye için anlık hesaplama araçları'
		},
		defaultSeo: {
			title: 'TR-Pratik | Türkiye İçin Anlık Hesaplama Araçları',
			description:
				'Yakıt maliyeti, vergi, kredi ve daha fazlasını saniyeler içinde hesaplamak için TR-Pratik koleksiyonunu keşfedin.',
			canonical,
			schema: {
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				name: 'TR-Pratik',
				url: canonical,
				potentialAction: {
					'@type': 'SearchAction',
					target: `${origin}/hesapla/{aramaTerimi}`,
					'query-input': 'required name=aramaTerimi'
				}
			}
		},
		navLinks: [{ href: '/hesapla/yakit-tuketimi/', label: 'Yakıt Tüketimi' }]
	};
}

