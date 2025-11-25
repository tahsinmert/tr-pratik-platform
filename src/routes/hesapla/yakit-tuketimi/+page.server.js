import { cities } from '$lib/data/cities';
import { slugify } from '$lib/utils';

export const ssr = true;

const defaultOrigin = 'İstanbul';
const defaultDestination = 'Ankara';

export function load({ url }) {
	const originUrl = url.origin ?? '';
	const path = '/hesapla/yakit-tuketimi/';
	const canonical = originUrl ? `${originUrl}${path}` : path;

	const featuredTrips = [
		{ origin: 'İstanbul', destination: 'Ankara' },
		{ origin: 'İzmir', destination: 'Antalya' },
		{ origin: 'Adana', destination: 'Gaziantep' }
	].map((trip) => ({
		...trip,
		path: `/hesapla/${slugify(trip.origin)}-${slugify(trip.destination)}-yakit-hesaplama/`
	}));

	return {
		cities,
		defaultSelection: {
			origin: defaultOrigin,
			destination: defaultDestination
		},
		featuredTrips,
		seo: {
			title: 'Türkiye Yakıt Hesaplama Merkezi | TR-Pratik',
			description:
				'81 ildeki şehirler arası yakıt maliyetlerini, sürüş planınızı ve tasarruf ipuçlarını dakikalar içinde planlayın. Nereden nereye gideceğinizi seçin, gerisini biz hesaplayalım.',
			canonical,
			schema: {
				'@context': 'https://schema.org',
				'@type': 'FAQPage',
				mainEntity: [
					{
						'@type': 'Question',
						name: 'Şehirler arası yakıt maliyeti nasıl hesaplanır?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'TR-Pratik yolculuğunuzun mesafesine, aracınızın tüketimine ve güncel akaryakıt fiyatlarına göre toplam yakıt maliyetini otomatik olarak hesaplar.'
						}
					},
					{
						'@type': 'Question',
						name: 'Hangi iller için hesaplama yapabilirim?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Türkiye’deki 81 ilin tamamı listelenir. Başlangıç ve varış illerini seçerek otomatik hesaplama alabilirsiniz.'
						}
					}
				],
				url: canonical,
				publisher: {
					'@type': 'Organization',
					name: 'TR-Pratik'
				}
			}
		}
	};
}
