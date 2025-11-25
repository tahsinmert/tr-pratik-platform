<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Hakkımızda - TR-Pratik Vizyonu | TR-Pratik</title>
	<meta
		name="description"
		content="TR-Pratik hakkında. Türkiye'nin yeni nesil, hızlı ve pratik hesaplama merkezi. Karmaşık finansal ve günlük hesaplamaları en yalın ve en doğru şekilde sunuyoruz."
	/>
</svelte:head>

<div class="mx-auto max-w-4xl space-y-16">
	<!-- Hero Section -->
	<section class="space-y-6 text-center">
		<h1 class="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
			Türkiye'nin Yeni Nesil, Hızlı ve Pratik Hesaplama Merkezi
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-slate-600 sm:text-xl">
			Karmaşık finansal ve günlük hesaplamaları, en yalın ve en doğru şekilde sunmak için buradayız.
		</p>
	</section>

	<!-- Values Grid -->
	<section class="space-y-8">
		<h2 class="text-center text-3xl font-bold text-slate-900">Neden TR-Pratik?</h2>
		<div class="grid gap-8 md:grid-cols-3">
			<!-- Hız ve Teknoloji -->
			<div class="flex flex-col space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
				<div class="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
					<svg
						class="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-slate-900">Hız ve Teknoloji</h3>
				<p class="text-slate-600">
					Eski nesil, yavaş sitelerin aksine SvelteKit teknolojisiyle milisaniyeler içinde sonuç
					üretiriz.
				</p>
			</div>

			<!-- Şeffaflık -->
			<div class="flex flex-col space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
				<div class="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-600">
					<svg
						class="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
						/>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-slate-900">Şeffaflık</h3>
				<p class="text-slate-600">
					Kredi ve vergi hesaplamalarında gizli formüller kullanmayız. Tüm veriler EPDK ve BDDK
					standartlarına uygundur.
				</p>
			</div>

			<!-- Kullanıcı Odaklılık -->
			<div class="flex flex-col space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
				<div class="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
					<svg
						class="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-slate-900">Kullanıcı Odaklılık</h3>
				<p class="text-slate-600">
					Reklamlara boğulmuş değil, sonuca odaklanan temiz bir arayüz sunarız.
				</p>
			</div>
		</div>
	</section>

	<!-- The Story Section -->
	<section class="rounded-2xl border-l-4 border-blue-500 bg-blue-50/50 p-8 shadow-card">
		<h2 class="mb-4 text-2xl font-semibold text-slate-900">Geliştiriciden Not</h2>
		<div class="prose prose-slate max-w-none text-slate-700">
			<p class="text-lg leading-relaxed">
				TR-Pratik, internetteki bilgi kirliliğini ve karmaşık hesaplama araçlarını sadeleştirmek
				amacıyla <strong>Tahsin Mert Mutlu</strong> tarafından geliştirilmiştir. Amacımız,
				Türkiye'deki kullanıcıların en doğru bilgiye en hızlı yoldan ulaşmasını sağlamaktır.
			</p>
		</div>
	</section>

	<!-- Call to Action -->
	<section class="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-8 text-center shadow-card">
		<p class="mb-6 text-lg font-medium text-slate-700">Önerileriniz için bizimle iletişime geçin.</p>
		<a
			href="/iletisim"
			class="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary-dark hover:shadow-lg"
		>
			İletişim Sayfası
			<svg
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
			</svg>
		</a>
	</section>
</div>
