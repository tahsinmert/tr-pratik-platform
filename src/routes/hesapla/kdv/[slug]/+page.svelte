<script>
	import { calculateVAT, formatCurrency, VAT_RATES, WITHHOLDING_RATES, DEFAULT_VAT } from '$lib/utils/vat';

	export const ssr = true;

	let { data } = $props();

	const initialVAT = data?.vat ?? {};
	const serverResult = data?.result;

	const defaultAmount = initialVAT.amount ?? DEFAULT_VAT.amount;
	const defaultVatRate = initialVAT.vatRate ?? DEFAULT_VAT.vatRate;
	const defaultCalculationType = initialVAT.calculationType ?? DEFAULT_VAT.calculationType;
	const defaultWithholding = initialVAT.withholding ?? DEFAULT_VAT.withholding;
	const defaultWithholdingRate = initialVAT.withholdingRate ?? DEFAULT_VAT.withholdingRate;

	let amount = $state(defaultAmount);
	let vatRate = $state(defaultVatRate);
	let calculationType = $state(defaultCalculationType);
	let withholding = $state(defaultWithholding);
	let withholdingRate = $state(defaultWithholdingRate);
	let customVatRate = $state('');
	let copiedValue = $state('');
	let copyTimeout = $state(null);

	let results = $state(
		serverResult ??
			calculateVAT(defaultAmount, defaultVatRate, defaultCalculationType, defaultWithholding, defaultWithholdingRate)
	);

	$effect(() => {
		results = calculateVAT(amount, vatRate, calculationType, withholding, withholdingRate);
	});

	function setVatRate(rate) {
		vatRate = rate;
		customVatRate = '';
	}

	function setCustomVatRate() {
		const custom = Number(customVatRate);
		if (!isNaN(custom) && custom >= 0 && custom <= 100) {
			vatRate = custom;
		}
	}

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
		<p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary-dark">TR-Pratik Finans</p>
		<h1 class="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">KDV Hesaplama ve Tevkifat Robotu</h1>
		<p class="mt-2 text-sm text-slate-500">
			KDV dahil veya hariç hesaplama yapın. Tevkifat desteği ile profesyonel KDV hesaplamaları.
		</p>
	</header>

	<div class="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
		<form class="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
			<label class="block">
				<span class="mb-2 block text-sm font-medium text-gray-700">Tutar (TL)</span>
				<div class="relative">
					<span class="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-500">₺</span>
					<input
						type="number"
						min="0"
						step="0.01"
						class="h-14 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-base font-semibold text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
						bind:value={amount}
						inputmode="decimal"
					/>
				</div>
			</label>

			<div class="space-y-3">
				<label class="mb-2 block text-sm font-medium text-gray-700">Hesaplama Türü</label>
				<div class="flex gap-4">
					<label class="flex flex-1 cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-500 hover:bg-blue-50">
						<input
							type="radio"
							name="calculationType"
							value="excluded"
							bind:group={calculationType}
							class="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
						/>
						<span class="text-sm font-semibold text-slate-700">KDV Hariç</span>
					</label>
					<label class="flex flex-1 cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-500 hover:bg-blue-50">
						<input
							type="radio"
							name="calculationType"
							value="included"
							bind:group={calculationType}
							class="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
						/>
						<span class="text-sm font-semibold text-slate-700">KDV Dahil</span>
					</label>
				</div>
			</div>

			<div class="space-y-3">
				<label class="mb-2 block text-sm font-medium text-gray-700">KDV Oranı (%)</label>
				<div class="flex flex-wrap gap-3">
					{#each VAT_RATES as rate}
						<button
							type="button"
							onclick={() => setVatRate(rate)}
							class={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
								vatRate === rate && !customVatRate
									? 'bg-blue-600 text-white shadow-md'
									: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
							}`}
						>
							%{rate}
						</button>
					{/each}
				</div>
				<div class="flex gap-2">
					<div class="relative flex-1">
						<span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">%</span>
						<input
							type="number"
							min="0"
							max="100"
							step="0.1"
							placeholder="Özel oran"
							class="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
							bind:value={customVatRate}
							oninput={setCustomVatRate}
							inputmode="decimal"
						/>
					</div>
					{#if customVatRate}
						<button
							type="button"
							onclick={() => {
								customVatRate = '';
								vatRate = DEFAULT_VAT.vatRate;
							}}
							class="rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
						>
							Temizle
						</button>
					{/if}
				</div>
			</div>

			<div class="space-y-3">
				<label class="flex cursor-pointer items-center gap-3">
					<input
						type="checkbox"
						bind:checked={withholding}
						class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
					/>
					<span class="text-sm font-medium text-gray-700">Tevkifat Uygula</span>
				</label>
				{#if withholding}
					<select
						class="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
						bind:value={withholdingRate}
					>
						<option value="">Tevkifat oranı seçin</option>
						{#each WITHHOLDING_RATES as rate}
							<option value={rate.value}>{rate.label}</option>
						{/each}
					</select>
				{/if}
			</div>
		</form>

		<div class="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
			<div class="relative overflow-hidden rounded-2xl border-t-4 border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
				<p class="text-xs font-semibold uppercase tracking-wide text-blue-600">Genel Toplam</p>
				<div class="mt-3 flex items-baseline justify-between">
					<p class="text-5xl font-black text-slate-900">{formatCurrency(results.finalTotal)}</p>
					<button
						type="button"
						onclick={() => copyToClipboard(formatCurrency(results.finalTotal), 'finalTotal')}
						class="ml-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 text-slate-600 transition-colors hover:bg-white hover:text-slate-900"
						title="Kopyala"
					>
						{#if copiedValue === 'finalTotal'}
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
			</div>

			<div class="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
				<div class="flex items-center justify-between">
					<span class="text-slate-600">KDV Tutarı</span>
					<span class="text-lg font-bold text-slate-900">{formatCurrency(results.vatAmount)}</span>
				</div>
				{#if withholding && withholdingRate}
					<div class="flex items-center justify-between border-t border-slate-200 pt-4">
						<span class="text-slate-600">Tevkifat Tutarı</span>
						<span class="text-lg font-bold text-orange-600">{formatCurrency(results.withholdingAmount)}</span>
					</div>
				{/if}
			</div>

			<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
				<div class="mb-2 font-semibold text-slate-900">Hesaplama Detayı:</div>
				<div class="space-y-1">
					<div>Matrah: {formatCurrency(results.baseAmount)}</div>
					<div>KDV ({vatRate}%): {formatCurrency(results.vatAmount)}</div>
					{#if withholding && withholdingRate}
						<div>Tevkifat ({withholdingRate}): {formatCurrency(results.withholdingAmount)}</div>
					{/if}
					<div class="pt-2 font-semibold text-slate-900">
						{calculationType === 'included' ? 'KDV Dahil' : 'KDV Hariç'} Toplam:{' '}
						{formatCurrency(results.totalAmount)}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

