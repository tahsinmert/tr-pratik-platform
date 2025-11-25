export const ssr = true;

export function load({ url }) {
	const origin = url.origin || 'https://tr-pratik.vercel.app';
	const currentPath = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
	const canonical = new URL(currentPath, origin).toString();

	return {
		seo: {
			title: 'Çerez Politikası | TR-Pratik',
			description:
				'TR-Pratik çerez politikası. Web sitemizde kullanılan çerezler, türleri, amaçları ve yönetimi hakkında detaylı bilgiler.',
			canonical
		}
	};
}

