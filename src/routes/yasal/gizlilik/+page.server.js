export const ssr = true;

export function load({ url }) {
	const origin = url.origin || 'https://tr-pratik.vercel.app';
	const currentPath = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
	const canonical = new URL(currentPath, origin).toString();

	return {
		seo: {
			title: 'Gizlilik Politikası | TR-Pratik',
			description:
				'TR-Pratik gizlilik politikası. Kişisel verilerinizin korunması ve kullanımı hakkında detaylı bilgiler. KVKK uyumlu gizlilik politikamızı inceleyin.',
			canonical
		}
	};
}

