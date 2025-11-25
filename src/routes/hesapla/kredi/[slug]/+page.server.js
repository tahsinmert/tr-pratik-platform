import { error } from '@sveltejs/kit';
import {
	buildLoanTitle,
	calculateLoanMetrics,
	parseLoanSlug,
	DEFAULT_LOAN
} from '$lib/utils/loan';

export const ssr = true;

export function load({ params, url }) {
	const { slug } = params;

	if (!slug) {
		throw error(404, 'Kredi rotası bulunamadı');
	}

	const parsed = parseLoanSlug(slug);

	if (!parsed) {
		throw error(404, 'Kredi parametreleri çözümlenemedi');
	}

	const loan = {
		amount: parsed.amount || DEFAULT_LOAN.amount,
		term: parsed.term || DEFAULT_LOAN.term,
		rate: DEFAULT_LOAN.rate,
		type: parsed.type || DEFAULT_LOAN.type
	};

	const result = calculateLoanMetrics(loan.amount, loan.term, loan.rate);

	const origin = url.origin ?? '';
	const canonicalPath = `/hesapla/kredi/${slug}/`;
	const canonical = origin ? `${origin}${canonicalPath}` : canonicalPath;

	const title = buildLoanTitle(loan.amount, loan.term, loan.type);
	const description = `${loan.term} ay vadeli ${loan.type} için ${loan.amount.toLocaleString(
		'tr-TR'
	)} TL kredi kullandığınızda aylık taksit ve toplam geri ödemeyi görün.`;

	return {
		loan,
		result,
		seo: {
			title,
			description,
			canonical
		}
	};
}


