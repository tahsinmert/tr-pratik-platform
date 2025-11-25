<script>
	import { onMount } from 'svelte';
	import PopularRoutes from '$lib/components/PopularRoutes.svelte';

	export const ssr = true;

	let { data } = $props();

const trip = data?.trip ?? {};
const distanceKm = Number(data?.distanceKm ?? 0);
const coordinates = data?.coordinates ?? {};
const defaults = data?.defaults ?? {};
/** @type {Record<string, number>} */
const fuelPriceMap = data?.fuelPrices ?? {};

let fuelPrice = $state(defaults.fuelPrice ?? 43.5);
let consumption = $state(defaults.consumption ?? 6.5);
let results = $state({ liters: 0, cost: 0 });
let activeFuelKey = $state('custom');
	let estimatedDuration = $state('—');
	let ogImageUrl = $state('');
	let copiedValue = $state('');
	let copyTimeout = $state(null);

	const currencyFormatter = new Intl.NumberFormat('tr-TR', {
		style: 'currency',
		currency: 'TRY',
		maximumFractionDigits: 2
	});

	const litersFormatter = new Intl.NumberFormat('tr-TR', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

const distanceFormatter = new Intl.NumberFormat('tr-TR', {
	minimumFractionDigits: 1,
	maximumFractionDigits: 1
});

	function computeResults() {
		const liters = ((Number(distanceKm) || 0) / 100) * (Number(consumption) || 0);
		const cost = liters * (Number(fuelPrice) || 0);

		return {
			liters,
			cost
		};
	}

	/** @param {SubmitEvent | MouseEvent | undefined} [event] */
	function recalculate(event = undefined) {
		event?.preventDefault();
		results = computeResults();
	}

	/**
	 * @param {number | undefined} value
	 */
	function formatCoord(value) {
		return typeof value === 'number' ? value.toFixed(2) : '—';
	}

	/**
	 * @param {string} key
	 */
	function applyFuelPrice(key) {
		const value = fuelPriceMap?.[key];
		if (typeof value === 'number') {
			fuelPrice = value;
			activeFuelKey = key;
			recalculate();
		}
	}

	const relatedRoutes = [
		{ origin: trip.originName, destination: trip.destinationName },
		{ origin: trip.originName, destination: 'İstanbul' },
		{ origin: trip.destinationName, destination: 'İstanbul' },
		{ origin: trip.originName, destination: 'Ankara' },
		{ origin: trip.destinationName, destination: 'Ankara' },
		{ origin: 'İstanbul', destination: trip.destinationName }
	].filter(
		(route, index, self) =>
			route.origin &&
			route.destination &&
			route.origin !== route.destination &&
			index === self.findIndex(
				(other) => other.origin === route.origin && other.destination === route.destination
			)
	);

	onMount(() => {
		results = computeResults();
	const match = Object.entries(fuelPriceMap).find(
			([, value]) => Math.abs((Number(fuelPrice) || 0) - Number(value)) < 0.01
		);
		if (match) {
			activeFuelKey = match[0];
		}
	});

$effect(() => {
	const avgSpeed = 92;
	if (!distanceKm) {
		estimatedDuration = '—';
		return;
	}
	const hours = distanceKm / avgSpeed;
	const wholeHours = Math.floor(hours);
	const minutes = Math.round((hours - wholeHours) * 60);
	const normalizedMinutes = minutes === 60 ? 0 : minutes;
	const normalizedHours = minutes === 60 ? wholeHours + 1 : wholeHours;
	const hourLabel = normalizedHours > 0 ? `${normalizedHours} sa` : '';
	const minuteLabel = `${normalizedMinutes.toString().padStart(2, '0')} dk`;
	estimatedDuration = `${hourLabel} ${minuteLabel}`.trim();
});

	$effect(() => {
		const label = `${trip.originName ?? 'Türkiye'} - ${trip.destinationName ?? 'Rota'}`;
		const encoded = encodeURIComponent(label);
		ogImageUrl = `https://placehold.co/1200x630/2563eb/ffffff/png?text=${encoded}%0AYakit+Hesaplama&font=roboto`;
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

<svelte:head>
	<meta property="og:image" content={ogImageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={ogImageUrl} />
</svelte:head>

<section class="space-y-8">
	<div class="ad-container rounded-3xl border border-dashed border-slate-300 bg-slate-100 p-6 text-center text-sm font-semibold text-slate-500">
		Reklam Alanı
	</div>

	<div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
		<aside class="order-first lg:order-last">
			<div class="space-y-4 lg:sticky lg:top-6">
				<div
					class="rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition lg:p-7"
				>
					<div class="space-y-4 lg:space-y-5">
						<div class="text-center lg:text-left">
							<p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary-dark">
								{trip.originName} ➜ {trip.destinationName}
							</p>
							<h1 class="mt-2 text-2xl font-bold text-ink sm:text-3xl">
								Rota özeti
							</h1>
						</div>

						<div class="grid gap-4 sm:grid-cols-2">
							<div class="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm">
								<p class="text-xs uppercase tracking-wide text-slate-400">Toplam Mesafe</p>
								<p class="mt-1 text-2xl font-bold text-ink">
									{distanceFormatter.format(distanceKm)} km
								</p>
							</div>
							<div class="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm">
								<p class="text-xs uppercase tracking-wide text-slate-400">Tahmini Süre</p>
								<p class="mt-1 text-2xl font-bold text-ink">{estimatedDuration}</p>
							</div>
						</div>

						<div class="relative overflow-hidden rounded-2xl border-t-4 border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-xl">
							<p class="text-xs font-semibold uppercase tracking-wide text-blue-600">Toplam maliyet (TL)</p>
							<div class="mt-3 flex items-baseline justify-between">
								<p class="text-5xl font-black text-slate-900">{currencyFormatter.format(results.cost)}</p>
								<button
									type="button"
									onclick={() => copyToClipboard(currencyFormatter.format(results.cost), 'sidebar-cost')}
									class="ml-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 text-slate-600 transition-colors hover:bg-white hover:text-slate-900"
									title="Kopyala"
								>
									{#if copiedValue === 'sidebar-cost'}
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

						<button
							type="button"
							class="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary"
							onclick={recalculate}
						>
							Yeniden hesapla
						</button>

						<div class="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-500">
							<p>
								Veriler OSRM sürüş rotalarından, yakıt tahminleri ise güncel Türkiye ortalamasından
								alınır. Trafik ve yük durumuna göre +/− %5 tolerans bırakın.
							</p>
							<p class="mt-2">
								{trip.originName}: {formatCoord(coordinates.origin?.lat)}°N /
								{formatCoord(coordinates.origin?.lon)}°E
							</p>
							<p>
								{trip.destinationName}: {formatCoord(coordinates.destination?.lat)}°N /
								{formatCoord(coordinates.destination?.lon)}°E
							</p>
						</div>
					</div>
				</div>

				<div class="ad-container rounded-3xl border border-dashed border-slate-300 bg-slate-100 p-6 text-center text-sm font-semibold text-slate-500">
					Reklam Alanı
				</div>
			</div>
		</aside>

		<article class="space-y-6">
			<header class="rounded-3xl border border-slate-200 bg-white p-6 shadow-card space-y-4 text-center lg:text-left">
				<p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary-dark">
					{trip.originName} ➜ {trip.destinationName}
				</p>
				<h2 class="text-3xl font-bold text-ink sm:text-4xl">
					{trip.originName} ile {trip.destinationName} arası yakıt hesaplama
				</h2>
				<p class="text-base text-slate-500">
					Bu rota için OSRM gerçek sürüş verilerine göre tahmini mesafe:
					<span class="font-semibold text-ink"> {distanceFormatter.format(distanceKm)} km </span>.
				</p>
			</header>

			<section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-card space-y-8">
				<form class="space-y-6" onsubmit={recalculate}>
					<div class="grid gap-6 sm:grid-cols-2">
						<label class="block">
							<span class="mb-2 block text-sm font-medium text-gray-700">Yakıt Fiyatı (TL/Litre)</span>
							<div class="relative">
								<span class="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-500">₺</span>
								<input
									type="number"
									step="0.1"
									min="0"
									class="h-14 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-base font-semibold text-ink placeholder:text-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
									bind:value={fuelPrice}
									inputmode="decimal"
									required
								/>
							</div>
						</label>

						<label class="block">
							<span class="mb-2 block text-sm font-medium text-gray-700">Ortalama Tüketim (L/100km)</span>
							<input
								type="number"
								step="0.1"
								min="0"
								class="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-ink placeholder:text-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
								bind:value={consumption}
								inputmode="decimal"
								required
							/>
						</label>
					</div>

					{#if Object.keys(fuelPriceMap).length}
						<div class="flex flex-wrap gap-2 text-xs font-semibold">
							{#each Object.entries(fuelPriceMap) as [key, value]}
								<button
									type="button"
									class={`rounded-full border px-4 py-2 transition ${
										activeFuelKey === key
											? 'border-primary bg-primary/10 text-primary-dark'
											: 'border-slate-200 text-slate-500 hover:border-primary hover:text-primary'
									}`}
									onclick={() => applyFuelPrice(key)}
								>
									{key === 'benzin' ? 'Benzin' : key === 'motorin' ? 'Motorin' : key.toUpperCase()} • {value.toFixed(2)} TL
								</button>
							{/each}
						</div>
					{/if}

					<div class="grid gap-6 md:grid-cols-2">
						<div class="relative overflow-hidden rounded-2xl border-t-4 border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-xl">
							<p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Gereken yakıt</p>
							<div class="mt-3 flex items-baseline justify-between">
								<p class="text-5xl font-black text-slate-900">
									{litersFormatter.format(results.liters)} <span class="text-2xl font-bold">L</span>
								</p>
								<button
									type="button"
									onclick={() => copyToClipboard(litersFormatter.format(results.liters) + ' L', 'liters')}
									class="ml-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 text-slate-600 transition-colors hover:bg-white hover:text-slate-900"
									title="Kopyala"
								>
									{#if copiedValue === 'liters'}
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
						<div class="relative overflow-hidden rounded-2xl border-t-4 border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-xl">
							<p class="text-xs font-semibold uppercase tracking-wide text-blue-600">Toplam maliyet</p>
							<div class="mt-3 flex items-baseline justify-between">
								<p class="text-5xl font-black text-slate-900">{currencyFormatter.format(results.cost)}</p>
								<button
									type="button"
									onclick={() => copyToClipboard(currencyFormatter.format(results.cost), 'cost')}
									class="ml-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 text-slate-600 transition-colors hover:bg-white hover:text-slate-900"
									title="Kopyala"
								>
									{#if copiedValue === 'cost'}
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
					</div>

					<button
						type="submit"
						class="w-full rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-white shadow-card transition hover:bg-primary-dark"
					>
						Yeniden hesapla
					</button>
				</form>

				<div class="ad-container rounded-2xl border border-dashed border-slate-300 bg-slate-100 p-4 text-center text-sm font-semibold text-slate-500">
					Reklam Alanı
				</div>
			</section>
		</article>
	</div>
</section>

<PopularRoutes title="Önerilen diğer rotalar" routes={relatedRoutes} />

