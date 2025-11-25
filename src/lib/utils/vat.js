const currencyFormatter = new Intl.NumberFormat('tr-TR', {
	style: 'currency',
	currency: 'TRY',
	maximumFractionDigits: 2
});

export const DEFAULT_VAT = {
	amount: 1000,
	vatRate: 20,
	calculationType: 'excluded', // 'included' or 'excluded'
	withholding: false,
	withholdingRate: null // e.g., '2/10', '3/10', '5/10'
};

export const VAT_RATES = [1, 10, 20];

export const WITHHOLDING_RATES = [
	{ value: '2/10', label: '2/10' },
	{ value: '3/10', label: '3/10' },
	{ value: '5/10', label: '5/10' },
	{ value: '6/10', label: '6/10' },
	{ value: '7/10', label: '7/10' },
	{ value: '8/10', label: '8/10' },
	{ value: '9/10', label: '9/10' }
];

/**
 * @param {number} amount
 * @param {number} vatRate
 * @param {'included' | 'excluded'} calculationType
 * @param {boolean} withholding
 * @param {string | null} withholdingRate
 */
export function calculateVAT(amount, vatRate, calculationType, withholding, withholdingRate) {
	const numAmount = Number(amount) || 0;
	const numVatRate = Number(vatRate) || 0;

	let baseAmount, vatAmount, totalAmount;

	if (calculationType === 'included') {
		// KDV dahil: Tutar = Base + KDV, Base = Tutar / (1 + KDV/100)
		totalAmount = numAmount;
		baseAmount = totalAmount / (1 + numVatRate / 100);
		vatAmount = totalAmount - baseAmount;
	} else {
		// KDV hariç: Base = Tutar, KDV = Base * KDV/100
		baseAmount = numAmount;
		vatAmount = baseAmount * (numVatRate / 100);
		totalAmount = baseAmount + vatAmount;
	}

	let withholdingAmount = 0;
	let finalTotal = totalAmount;

	if (withholding && withholdingRate) {
		// Tevkifat: KDV'nin bir kısmı kesilir
		const [numerator, denominator] = withholdingRate.split('/').map(Number);
		if (denominator && numerator) {
			withholdingAmount = vatAmount * (numerator / denominator);
			finalTotal = totalAmount - withholdingAmount;
		}
	}

	return {
		baseAmount,
		vatAmount,
		withholdingAmount,
		totalAmount,
		finalTotal
	};
}

/**
 * @param {string} slug
 */
export function parseVATSlug(slug) {
	if (!slug) return null;

	// Generic: "hesaplama"
	if (slug === 'hesaplama') {
		return { generic: true };
	}

	// Pattern: "1000-tl-yuzde-20-kdv-dahil" or "1000-tl-yuzde-20-kdv-haric"
	const fullMatch = slug.match(/^(\d+)-tl-yuzde-(\d+)-kdv-(dahil|haric)$/i);
	if (fullMatch) {
		const [, amountRaw, rateRaw, typeRaw] = fullMatch;
		return {
			amount: Number(amountRaw),
			vatRate: Number(rateRaw),
			calculationType: typeRaw === 'dahil' ? 'included' : 'excluded'
		};
	}

	// Pattern: "yuzde-20-kdv-hesaplama"
	const rateMatch = slug.match(/^yuzde-(\d+)-kdv-hesaplama$/i);
	if (rateMatch) {
		const [, rateRaw] = rateMatch;
		return {
			vatRate: Number(rateRaw)
		};
	}

	// Pattern: "1000-tl-kdv-hesaplama"
	const amountMatch = slug.match(/^(\d+)-tl-kdv-hesaplama$/i);
	if (amountMatch) {
		const [, amountRaw] = amountMatch;
		return {
			amount: Number(amountRaw)
		};
	}

	return null;
}

/**
 * @param {number | undefined} amount
 * @param {number | undefined} vatRate
 * @param {'included' | 'excluded' | undefined} calculationType
 */
export function buildVATTitle(amount, vatRate, calculationType) {
	if (amount && vatRate && calculationType) {
		const formattedAmount = currencyFormatter.format(amount);
		const typeLabel = calculationType === 'included' ? 'KDV Dahil' : 'KDV Hariç';
		return `${formattedAmount} %${vatRate} ${typeLabel} Ne Kadar? - TR-Pratik`;
	}
	return 'KDV Hesaplama ve Tevkifat Robotu 2025 - TR-Pratik';
}

/**
 * @param {number} value
 */
export function formatCurrency(value) {
	return currencyFormatter.format(value || 0);
}

