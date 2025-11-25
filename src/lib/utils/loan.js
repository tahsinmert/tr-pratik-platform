const currencyFormatter = new Intl.NumberFormat('tr-TR', {
	style: 'currency',
	currency: 'TRY',
	maximumFractionDigits: 0
});

/**
 * @param {number} amount
 */
export function formatAmount(amount) {
	return currencyFormatter.format(amount ?? 0);
}

export const DEFAULT_LOAN = {
	amount: 100_000,
	term: 12,
	rate: 3.5,
	type: 'ihtiyaç kredisi'
};

export const TERM_OPTIONS = [6, 12, 24, 36, 48, 60, 120];

/**
 * @param {number} amount
 * @param {number} term
 * @param {number} rate
 */
export function calculateLoanMetrics(amount, term, rate) {
	const principal = Number(amount) || 0;
	const months = Number(term) || 1;
	const monthlyRate = (Number(rate) || 0) / 100;

	let monthlyPayment = 0;

	if (monthlyRate === 0) {
		monthlyPayment = principal / months;
	} else {
		const factor = Math.pow(1 + monthlyRate, months);
		monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
	}

	const totalPayment = monthlyPayment * months;
	const totalInterest = totalPayment - principal;

	return {
		monthlyPayment,
		totalPayment,
		totalInterest
	};
}

/**
 * @param {string} slug
 */
export function parseLoanSlug(slug) {
	if (!slug) return null;
	
	// Match pattern: amount-tl-term-ay[-optional-suffix]
	// Examples: "100000-tl-12-ay", "100000-tl-12-ay-kredi-hesaplama"
	const match = slug.match(/^(\d+)-tl-(\d+)-ay(?:-.*)?$/i);
	if (!match) return null;

	const [, amountRaw, termRaw] = match;
	const amount = Number(amountRaw);
	const term = Number(termRaw);

	// Validate parsed values
	if (isNaN(amount) || amount <= 0 || isNaN(term) || term <= 0) {
		return null;
	}

	return {
		amount,
		term,
		type: DEFAULT_LOAN.type
	};
}

/**
 * @param {number} amount
 * @param {number} term
 * @param {string} loanType
 */
export function buildLoanTitle(amount, term, loanType) {
	const formatted = formatAmount(amount);
	const typeLabel = loanType ? `${capitalize(loanType)} ` : '';
	return `${formatted} ${term} Ay Vadeli ${typeLabel}Kredi Hesaplama ve Ödeme Planı`;
}

/**
 * @param {string} text
 */
function capitalize(text = '') {
	return text.charAt(0).toUpperCase() + text.slice(1);
}


