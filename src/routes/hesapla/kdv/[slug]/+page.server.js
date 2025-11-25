import { error } from '@sveltejs/kit';
import { parseVATSlug, buildVATTitle, DEFAULT_VAT, calculateVAT } from '$lib/utils/vat';

export const ssr = true;

export function load({ params, url }) {
	const { slug } = params;

	if (!slug) {
		throw error(404, 'KDV rotası bulunamadı');
	}

	const parsed = parseVATSlug(slug);

	if (!parsed) {
		throw error(404, 'KDV parametreleri çözümlenemedi');
	}

	// Handle generic 'hesaplama' slug
	if (parsed.generic) {
		const vatData = {
			amount: DEFAULT_VAT.amount,
			vatRate: DEFAULT_VAT.vatRate,
			calculationType: DEFAULT_VAT.calculationType,
			withholding: DEFAULT_VAT.withholding,
			withholdingRate: DEFAULT_VAT.withholdingRate
		};

		const result = calculateVAT(
			vatData.amount,
			vatData.vatRate,
			vatData.calculationType,
			vatData.withholding,
			vatData.withholdingRate
		);

		const origin = url.origin ?? '';
		const canonicalPath = `/hesapla/kdv/hesaplama/`;
		const canonical = origin ? `${origin}${canonicalPath}` : canonicalPath;

		return {
			vat: vatData,
			result,
			seo: {
				title: buildVATTitle(),
				description: 'KDV dahil ve hariç hesaplama yapın. Tevkifat desteği ile profesyonel KDV hesaplamaları için TR-Pratik.',
				canonical
			}
		};
	}

	const vatData = {
		amount: parsed.amount ?? DEFAULT_VAT.amount,
		vatRate: parsed.vatRate ?? DEFAULT_VAT.vatRate,
		calculationType: parsed.calculationType ?? DEFAULT_VAT.calculationType,
		withholding: DEFAULT_VAT.withholding,
		withholdingRate: DEFAULT_VAT.withholdingRate
	};

	const result = calculateVAT(
		vatData.amount,
		vatData.vatRate,
		vatData.calculationType,
		vatData.withholding,
		vatData.withholdingRate
	);

	const origin = url.origin ?? '';
	const canonicalPath = `/hesapla/kdv/${slug}/`;
	const canonical = origin ? `${origin}${canonicalPath}` : canonicalPath;

	const title = buildVATTitle(vatData.amount, vatData.vatRate, vatData.calculationType);
	const description = `${vatData.amount.toLocaleString('tr-TR')} TL için %${vatData.vatRate} KDV ${vatData.calculationType === 'included' ? 'dahil' : 'hariç'} hesaplama. Tevkifat desteği ile detaylı sonuçlar.`;

	return {
		vat: vatData,
		result,
		seo: {
			title,
			description,
			canonical
		}
	};
}

