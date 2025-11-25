export const ssr = true;

export function load({ url }) {
	const origin = url.origin ?? '';
	const canonicalPath = '/iletisim/';
	const canonical = origin ? `${origin}${canonicalPath}` : canonicalPath;

	const title = 'İletişim - TR-Pratik';
	const description =
		'TR-Pratik ile iletişime geçin. Görüşleriniz, önerileriniz veya hata bildirimleriniz bizim için değerli. En kısa sürede size dönüş yapacağız.';

	return {
		seo: {
			title,
			description,
			canonical
		}
	};
}

