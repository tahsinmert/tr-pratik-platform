<script>
	import PopularRoutes from '$lib/components/PopularRoutes.svelte';

	export const ssr = true;

	const cards = [
		{
			title: 'Yakıt Hesaplama',
			description: 'İller arası veya mesafe bazlı yakıt masrafınızı hesaplayın.',
			href: '/hesapla/istanbul-ankara-yakit-hesaplama',
			icon: 'fuel',
			cta: 'Yakıt aracını aç'
		},
		{
			title: 'Kredi Hesaplama',
			description: 'İhtiyaç, Taşıt veya Konut kredisi geri ödeme planınızı oluşturun.',
			href: '/hesapla/kredi/100000-tl-12-ay-kredi-hesaplama',
			icon: 'credit',
			cta: 'Kredi aracını aç'
		},
		{
			title: 'KDV Hesaplama',
			description: 'KDV tutarlarınızı saniyeler içinde öğrenin. Tevkifat desteği ile profesyonel hesaplamalar.',
			href: '/hesapla/kdv/hesaplama',
			icon: 'tax',
			cta: 'KDV aracını aç'
		}
	];
</script>

<section class="space-y-12 rounded-3xl border border-dashed border-primary/30 bg-white/80 p-8 shadow-card">
	<div class="space-y-4 text-center">
		<p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary-dark">TR-Pratik</p>
		<h1 class="text-3xl font-bold text-ink sm:text-4xl">Türkiye'nin En Pratik Hesaplama Merkezi</h1>
		<p class="mx-auto max-w-2xl text-base text-slate-600">
			Gerçek hayat senaryoları için hızlı, doğru ve ücretsiz hesaplama araçlarını tek bir merkezde topluyoruz.
			İster uzun bir yolculuk planlayın ister kredi ödemelerinizi netleştirin, TR-Pratik her adımda yanınızda.
		</p>
	</div>

	<div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
		{#each cards as card}
			<a
				class={`group relative flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-card transition duration-300 ${
					card.comingSoon
						? 'pointer-events-none opacity-70 grayscale'
						: 'hover:-translate-y-1 hover:scale-[1.01] hover:border-primary/50 hover:shadow-lg'
				}`}
				href={card.comingSoon ? undefined : card.href}
				aria-disabled={card.comingSoon}
			>
				{#if card.comingSoon}
					<span class="absolute right-4 top-4 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
						Yakında
					</span>
				{/if}
				<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
					{#if card.icon === 'fuel'}
						<svg class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path
								d="M8 3h6a2 2 0 0 1 2 2v16H6V5a2 2 0 0 1 2-2Zm0 4v3h6V7H8Zm9 2h2l2 2v7a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1v-5.17l-1-1V12h-1V9Z"
							/>
						</svg>
					{:else if card.icon === 'credit'}
						<svg class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<rect x="3" y="4" width="18" height="16" rx="3" />
							<rect x="3" y="8" width="18" height="3" fill="currentColor" class="opacity-60" />
							<path d="M7 15h4v2H7v-2Zm6 0h4v2h-4v-2Z" class="opacity-90" />
						</svg>
					{:else}
						<svg class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<rect x="6" y="3" width="12" height="18" rx="2" />
							<rect x="8" y="6" width="8" height="2" class="opacity-70" />
							<path d="M8 11h2v2H8v-2Zm3 0h2v2h-2v-2Zm3 0h2v2h-2v-2Zm-6 4h2v2H8v-2Z" class="opacity-80" />
						</svg>
					{/if}
				</div>
				<div class="space-y-2">
					<h3 class="text-xl font-semibold text-ink">{card.title}</h3>
					<p class="text-sm text-slate-600">{card.description}</p>
				</div>
				{#if !card.comingSoon}
					<span class="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
						{card.cta}
						<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</span>
				{/if}
			</a>
		{/each}
	</div>

	<div class="space-y-4 rounded-2xl bg-slate-50/70 p-6 text-center sm:text-left">
		<h2 class="text-2xl font-semibold text-ink">Neden TR-Pratik?</h2>
		<p class="text-slate-600">
			<strong>Hızlı:</strong> Gereksiz form doldurmadan saniyeler içinde sonuç alın. <strong>Doğru:</strong> Güncel veriler ve
			gerçekçi varsayımlar kullanılır. <strong>Ücretsiz:</strong> Tüm araçlarımız kısıtlama olmadan herkesin kullanımına açıktır.
		</p>
	</div>
</section>

<div class="mt-12">
	<PopularRoutes />
</div>
