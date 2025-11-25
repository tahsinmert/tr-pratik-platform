export const ssr = true;

export function load({ url }) {
	const origin = url.origin || 'https://tr-pratik.vercel.app';
	const currentPath = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
	const canonical = new URL(currentPath, origin).toString();

	return {
		seo: {
			title: 'Kullanım Şartları | TR-Pratik',
			description:
				'TR-Pratik kullanım şartları. Platform kullanımına ilişkin yasal koşullar, kurallar ve kullanıcı sorumlulukları hakkında bilgiler.',
			canonical
		}
	};
}

