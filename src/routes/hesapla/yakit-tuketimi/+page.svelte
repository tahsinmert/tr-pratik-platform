<script>
	import { goto } from '$app/navigation';
	import { slugify } from '$lib/utils';

	export const ssr = true;

	let { data } = $props();

	let allCities = $state(data?.cities ?? []);
	let featuredTrips = $state(data?.featuredTrips ?? []);
	let originCity = $state(data?.defaultSelection?.origin ?? '');
	let destinationCity = $state(data?.defaultSelection?.destination ?? '');

	const isDisabled = $derived(
		!originCity ||
			!destinationCity ||
			originCity === destinationCity ||
			allCities.length === 0
	);

	/** @param {SubmitEvent} event */
	function handleSubmit(event) {
		event?.preventDefault();
		if (isDisabled) return;

		const originSlug = slugify(originCity);
		const destinationSlug = slugify(destinationCity);

		goto(`/hesapla/${originSlug}-${destinationSlug}-yakit-hesaplama/`, { replaceState: false });
	}

	function swapCities() {
		[originCity, destinationCity] = [destinationCity, originCity];
	}
</script>

<section class="space-y-12">
	<article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
		<div class="mx-auto mb-8 max-w-2xl text-center space-y-3">
			<p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary-dark">TR-PRATİK</p>
			<h1 class="text-3xl font-bold text-ink sm:text-4xl">Şehirler arası yakıt hesaplamayı hızlandırın</h1>
			<p class="text-base text-slate-500">
				Nereden yola çıkacağını ve hangi ile varacağını seç; biz aradaki mesafeyi, yakıt ihtiyacını ve
				maliyetini yeni sayfada otomatik çıkaralım.
			</p>
		</div>

		<form class="grid gap-4 rounded-3xl bg-slate-50 p-6 lg:grid-cols-[1fr_auto_1fr]" onsubmit={handleSubmit}>
			<label class="space-y-2 text-sm font-semibold text-slate-600">
				<span>Nereden</span>
				<select
					class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-ink focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark/10"
					bind:value={originCity}
					required
				>
					{#each allCities as city}
						<option value={city}>{city}</option>
					{/each}
				</select>
			</label>

			<button
				type="button"
				class="mt-8 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-primary-dark shadow-card transition hover:bg-primary hover:text-white"
				onclick={swapCities}
				aria-label="Başlangıç ve varış şehirlerini değiştir"
			>
				↻
			</button>

			<label class="space-y-2 text-sm font-semibold text-slate-600">
				<span>Nereye</span>
				<select
					class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-ink focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark/10"
					bind:value={destinationCity}
					required
				>
					{#each allCities as city}
						<option value={city}>{city}</option>
					{/each}
				</select>
			</label>

			<button
				type="submit"
				class="lg:col-span-3 rounded-2xl bg-primary px-6 py-4 text-center text-base font-semibold text-white shadow-card transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-slate-300"
				disabled={isDisabled}
			>
				Hesapla
			</button>
		</form>
	</article>

	<article class="grid gap-6 md:grid-cols-2">
		<section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
			<h2 class="text-2xl font-bold text-ink">Öne çıkan rotalar</h2>
			<p class="mt-2 text-sm text-slate-500">
				Tek dokunuşla sık kullanılan güzergâhlara gidin ve otomatik hesaplama alın.
			</p>
			<div class="mt-4 flex flex-wrap gap-3">
				{#each featuredTrips as trip}
					<a
						class="rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold text-primary-dark transition hover:bg-primary hover:text-white"
						href={trip.path}
					>
						{trip.origin} ➜ {trip.destination}
					</a>
				{/each}
			</div>
		</section>

		<section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
			<h2 class="text-2xl font-bold text-ink">Yakıt maliyeti nasıl hesaplanır?</h2>
			<p class="mt-3 text-sm text-slate-600">
				Yol mesafesi, aracın ortalama tüketimi ve pompa fiyatı çarpılarak toplam maliyet bulunur. Araç türüne
				göre tüketim değişebileceğinden fabrika verilerini veya gerçek ölçümlerinizi kullanın.
			</p>
			<ul class="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
				<li>Yola çıkmadan önce lastik basınçlarını dengeleyin.</li>
				<li>120 km/s üzeri hızlarda tüketim %10-15 artar.</li>
				<li>Klima ve yük faktörleri tüketimi etkiler, +/− %5 pay bırakın.</li>
			</ul>
		</section>
	</article>
</section>

