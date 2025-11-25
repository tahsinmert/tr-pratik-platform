import { DEFAULT_LOAN, buildLoanTitle, calculateLoanMetrics } from '$lib/utils/loan';

export const ssr = true;

export function load({ url }) {
	const origin = url.origin ?? '';
	const canonicalPath = '/hesapla/kredi/';
	const canonical = origin ? `${origin}${canonicalPath}` : canonicalPath;

	const title = buildLoanTitle(DEFAULT_LOAN.amount, DEFAULT_LOAN.term, DEFAULT_LOAN.type);
	const description =
		'İhtiyaç kredisi, taşıt kredisi veya konut kredisi için aylık taksitlerinizi hesaplayın. Güncel faiz oranlarına göre toplam geri ödemeyi görün.';

	return {
		loan: DEFAULT_LOAN,
		result: calculateLoanMetrics(DEFAULT_LOAN.amount, DEFAULT_LOAN.term, DEFAULT_LOAN.rate),
		seo: {
			title,
			description,
			canonical
		}
	};
}


