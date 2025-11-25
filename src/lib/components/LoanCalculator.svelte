<script>
	import { TERM_OPTIONS, calculateLoanMetrics, formatAmount } from '$lib/utils/loan';

	let { data } = $props();

	const initialLoan = data?.loan ?? {};
	const serverResult = data?.result;

	const defaultAmount = initialLoan.amount ?? 100000;
	const defaultTerm = initialLoan.term ?? 12;
	const defaultRate = initialLoan.rate ?? 3.5;

	let amount = $state(defaultAmount);
	let term = $state(defaultTerm);
	let rate = $state(defaultRate);
	let loanType = $state(initialLoan.type ?? 'ihtiyaç kredisi');
	let results = $state(
		serverResult ?? calculateLoanMetrics(defaultAmount, defaultTerm, defaultRate)
	);
	let copiedValue = $state('');
	let copyTimeout = $state(null);

	const currencyFormatter = new Intl.NumberFormat('tr-TR', {
		style: 'currency',
		currency: 'TRY',
		maximumFractionDigits: 2
	});

	const summaryFormatter = new Intl.NumberFormat('tr-TR', {
		style: 'currency',
		currency: 'TRY',
		maximumFractionDigits: 0
	});

	const updatedAt = new Date().toLocaleDateString('tr-TR', {
		day: '2-digit',
		month: 'long',
		year: 'numeric'
	});

	/**
	 * @param {number} value
	 */
	function formatCurrency(value) {
		return currencyFormatter.format(value || 0);
	}

	function principalShare() {
		const total = results.totalPayment || 1;
		return Math.min(Math.max((amount / total) * 100, 0), 100);
	}

	function interestShare() {
		return 100 - principalShare();
	}

	$effect(() => {
		results = calculateLoanMetrics(amount, term, rate);
	});

	async function copyToClipboard(value, label) {
		try {
			await navigator.clipboard.writeText(value);
			copiedValue = label;
			if (copyTimeout) clearTimeout(copyTimeout);
			copyTimeout = setTimeout(() => {
				copiedValue = '';
			}, 2000);
		} catch (err) {
			console.error('Kopyalama hatası:', err);
		}
	}
</script>

<section class="space-y-8 text-slate-800">
	<header class="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
		<p class="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">TR-Pratik Finans</p>
		<h1 class="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
			{formatAmount(amount)} tutarında kredi için aylık ödeme planı
		</h1>
		<p class="mt-2 text-sm text-slate-500">
			Vade ve faiz oranını değiştirerek toplam geri ödeme ve faiz yükünü şeffaf biçimde görün.
		</p>
	</header>

	<div class="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
		<form class="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
			<div class="grid gap-6 sm:grid-cols-2">
				<label class="block">
					<span class="mb-2 block text-sm font-medium text-gray-700">Kredi Tutarı (TL)</span>
					<div class="relative">
						<span class="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-500">₺</span>
						<input
							type="number"
							min="1000"
							step="1000"
							class="h-14 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-base font-semibold text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
							bind:value={amount}
							inputmode="decimal"
						/>
					</div>
				</label>

				<label class="block">
					<span class="mb-2 block text-sm font-medium text-gray-700">Faiz Oranı (% aylık)</span>
					<div class="relative">
						<span class="absolute right-4 top-1/2 -translate-y-1/2 text-base font-semibold text-gray-500">%</span>
						<input
							type="number"
							min="0"
							step="0.01"
							class="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 pr-10 text-base font-semibold text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
							bind:value={rate}
							inputmode="decimal"
						/>
					</div>
				</label>
			</div>

			<div class="grid gap-6 sm:grid-cols-2">
				<label class="block">
					<span class="mb-2 block text-sm font-medium text-gray-700">Vade (Ay)</span>
					<select
						class="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
						bind:value={term}
					>
						{#each TERM_OPTIONS as option}
							<option value={option}>{option} Ay</option>
						{/each}
					</select>
				</label>

				<label class="block">
					<span class="mb-2 block text-sm font-medium text-gray-700">Kredi Türü</span>
					<input
						type="text"
						class="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
						bind:value={loanType}
					/>
				</label>
			</div>

			<div class="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
				✅ Güncel bankacılık ortalama faizleri ile hesaplandı. Son güncelleme: {updatedAt}
			</div>
		</form>

		<div class="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
			<div class="relative overflow-hidden rounded-2xl border-t-4 border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
				<p class="text-xs font-semibold uppercase tracking-wide text-blue-600">Aylık taksit</p>
				<div class="mt-3 flex items-baseline justify-between">
					<p class="text-5xl font-black text-slate-900">{formatCurrency(results.monthlyPayment)}</p>
					<button
						type="button"
						onclick={() => copyToClipboard(formatCurrency(results.monthlyPayment), 'monthly')}
						class="ml-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 text-slate-600 transition-colors hover:bg-white hover:text-slate-900"
						title="Kopyala"
					>
						{#if copiedValue === 'monthly'}
							<svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
						{:else}
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
							</svg>
						{/if}
					</button>
				</div>
				<p class="mt-2 text-sm text-slate-600">{term} ay boyunca her ay ödenecek tutar</p>
			</div>

			<div class="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm">
				<div class="flex items-center justify-between">
					<span class="text-slate-600">Toplam geri ödeme</span>
					<span class="font-semibold text-slate-900">{formatCurrency(results.totalPayment)}</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-slate-600">Toplam faiz yükü</span>
					<span class="font-semibold text-emerald-600">{formatCurrency(results.totalInterest)}</span>
				</div>
			</div>

			<div class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
				<div
					class="h-24 w-24 rounded-full border border-slate-700"
					style={`background: conic-gradient(#10b981 0 ${principalShare()}%, #f97316 ${principalShare()}% 100%);`}
				></div>
				<div class="space-y-2 text-xs">
					<div class="flex items-center gap-2 text-emerald-600">
						<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
						<span>Ana Para — {summaryFormatter.format(amount)}</span>
					</div>
					<div class="flex items-center gap-2 text-orange-600">
						<span class="h-2 w-2 rounded-full bg-orange-500"></span>
						<span>Faiz Toplamı — {formatCurrency(results.totalInterest)}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

