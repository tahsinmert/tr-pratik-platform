<script>
let {
	items = [
		{
			question: 'Hesaplama hangi verilere göre yapılıyor?',
			answer:
				'Mesafe verisi OSRM sürüş rotalarından, tüketim ve pompa fiyatları ise ortalama Türkiye değerlerinden alınır. Araç tüketimini kendinize göre güncelleyebilirsiniz.'
		},
		{
			question: 'LPG gerçekten tasarruf sağlar mı?',
			answer:
				'LPG litre fiyatı daha düşüktür; ancak tüketim benzine göre yaklaşık %10-15 fazladır. Yine de uzun rotalarda toplam maliyet çoğu zaman daha düşük olur.'
		},
		{
			question: 'Klima ve hız yakıtı ne kadar etkiler?',
			answer:
				'Yüksek hız ve klima kullanımı litre başına tüketimi artırır. Ortalama 120 km/s üzerindeki hızlarda %10-15, yoğun klima kullanımında ise %5 seviyesinde ekstra tüketim görülebilir.'
		}
	]
} = $props();

const schemaPayload = $derived(() => ({
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: (items ?? []).map((item) => ({
		'@type': 'Question',
		name: item.question,
		acceptedAnswer: {
			'@type': 'Answer',
			text: item.answer
		}
	}))
}));
</script>

<svelte:head>
	<script type="application/ld+json">
		{JSON.stringify(schemaPayload)}
	</script>
</svelte:head>

{#if items?.length}
	<section class="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
		<header>
			<p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary-dark">Sık sorulan sorular</p>
			<h2 class="text-2xl font-bold text-ink">Yakıt hesaplama hakkında merak edilenler</h2>
		</header>

		<div class="space-y-3">
			{#each items as item}
				<details class="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-primary/60">
					<summary class="cursor-pointer list-none text-base font-semibold text-ink">
						<span class="flex items-center justify-between gap-2">
							{item.question}
							<span
								class="text-sm font-bold text-primary transition group-open:rotate-45 group-open:text-primary-dark"
								aria-hidden="true"
							>
								+
							</span>
						</span>
					</summary>
					<p class="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
				</details>
			{/each}
		</div>
	</section>

{/if}

