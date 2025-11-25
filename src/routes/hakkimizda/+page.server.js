export const ssr = true;

export function load({ url }) {
	const origin = url.origin || 'https://tr-pratik.vercel.app';
	const currentPath = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
	const canonical = new URL(currentPath, origin).toString();

	return {
		seo: {
			title: 'Hakkımızda - TR-Pratik Vizyonu',
			description:
				'TR-Pratik hakkında bilgiler. Türkiye\'nin en hızlı hesaplama merkezi olarak misyonumuz, vizyonumuz ve değerlerimiz.',
			canonical
		}
	};
}

