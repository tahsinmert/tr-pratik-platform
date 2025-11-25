<script>
	export const ssr = true;

	let { data } = $props();

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');
	let isSubmitting = $state(false);
	let isSuccess = $state(false);
	let errors = $state({});

	function validateForm() {
		errors = {};
		if (!name.trim()) errors.name = 'Ad Soyad gereklidir';
		if (!email.trim()) {
			errors.email = 'E-posta gereklidir';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Geçerli bir e-posta adresi giriniz';
		}
		if (!subject) errors.subject = 'Konu seçimi gereklidir';
		if (!message.trim()) errors.message = 'Mesaj gereklidir';
		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		if (!validateForm()) return;

		isSubmitting = true;

		// Simulate API call
		// TODO: Gerçek e-posta gönderimi için Web3Forms veya Formspree entegrasyonu eklenebilir
		await new Promise((resolve) => setTimeout(resolve, 1500));

		isSubmitting = false;
		isSuccess = true;

		// Reset form
		name = '';
		email = '';
		subject = '';
		message = '';
	}

	// ContactPage Schema for SEO
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: 'İletişim - TR-Pratik',
		description: data?.seo?.description || '',
		mainEntity: {
			'@type': 'Organization',
			name: 'TR-Pratik',
			email: 'info@tr-pratik.com',
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'İstanbul',
				addressCountry: 'TR'
			}
		}
	};
</script>

<svelte:head>
	<script type="application/ld+json">
		{JSON.stringify(schema)}
	</script>
</svelte:head>

<div class="mx-auto max-w-6xl space-y-12 py-8">
	{#if isSuccess}
		<!-- Success Message -->
		<div class="mx-auto max-w-2xl rounded-2xl border border-green-200 bg-green-50 p-8 text-center shadow-card">
			<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
				<svg
					class="h-10 w-10 text-green-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
				</svg>
			</div>
			<h2 class="mb-2 text-2xl font-semibold text-ink">Mesajınız Başarıyla İletildi!</h2>
			<p class="text-slate-600">En kısa sürede dönüş yapacağız.</p>
			<button
				onclick={() => (isSuccess = false)}
				class="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
			>
				Yeni Mesaj Gönder
			</button>
		</div>
	{:else}
		<div class="grid gap-8 lg:grid-cols-2">
			<!-- Left Column: Contact Info -->
			<div class="space-y-6">
				<div class="space-y-4">
					<h1 class="text-3xl font-bold text-ink sm:text-4xl">İletişime Geçin</h1>
					<p class="text-lg text-slate-600">
						Görüşleriniz, önerileriniz veya hata bildirimleriniz bizim için değerli.
					</p>
				</div>

				<!-- Contact Details Card -->
				<div class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
					<!-- Email -->
					<div class="flex items-start gap-4">
						<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
							<svg
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="font-semibold text-ink">E-posta</h3>
							<a
								href="mailto:info@tr-pratik.com"
								class="text-primary transition hover:text-primary-dark hover:underline"
							>
								info@tr-pratik.com
							</a>
						</div>
					</div>

					<!-- Location -->
					<div class="flex items-start gap-4">
						<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
							<svg
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="font-semibold text-ink">Konum</h3>
							<p class="text-slate-600">İstanbul, Türkiye</p>
						</div>
					</div>

					<!-- Social Media Placeholder -->
					<div class="flex items-start gap-4 pt-2">
						<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
							<svg
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
								/>
							</svg>
						</div>
						<div>
							<h3 class="font-semibold text-ink">Sosyal Medya</h3>
							<div class="mt-2 flex gap-3">
								<!-- Twitter placeholder -->
								<a
									href="#"
									class="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-primary hover:text-primary"
									aria-label="Twitter"
								>
									<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path
											d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
										/>
									</svg>
								</a>
								<!-- LinkedIn placeholder -->
								<a
									href="#"
									class="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-primary hover:text-primary"
									aria-label="LinkedIn"
								>
									<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path
											fill-rule="evenodd"
											d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
											clip-rule="evenodd"
										/>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Column: Contact Form -->
			<div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
				<form onsubmit={handleSubmit} class="space-y-6">
					<!-- Name Field -->
					<div>
						<label for="name" class="mb-2 block text-sm font-semibold text-ink">
							Ad Soyad <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="name"
							bind:value={name}
							class="w-full rounded-xl border px-4 py-3 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.name
								? 'border-red-300'
								: 'border-slate-300'}"
							placeholder="Adınız ve soyadınız"
							required
						/>
						{#if errors.name}
							<p class="mt-1 text-sm text-red-600">{errors.name}</p>
						{/if}
					</div>

					<!-- Email Field -->
					<div>
						<label for="email" class="mb-2 block text-sm font-semibold text-ink">
							E-posta <span class="text-red-500">*</span>
						</label>
						<input
							type="email"
							id="email"
							bind:value={email}
							class="w-full rounded-xl border px-4 py-3 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.email
								? 'border-red-300'
								: 'border-slate-300'}"
							placeholder="ornek@email.com"
							required
						/>
						{#if errors.email}
							<p class="mt-1 text-sm text-red-600">{errors.email}</p>
						{/if}
					</div>

					<!-- Subject Field -->
					<div>
						<label for="subject" class="mb-2 block text-sm font-semibold text-ink">
							Konu <span class="text-red-500">*</span>
						</label>
						<select
							id="subject"
							bind:value={subject}
							class="w-full rounded-xl border px-4 py-3 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.subject
								? 'border-red-300'
								: 'border-slate-300'}"
							required
						>
							<option value="">Konu seçiniz</option>
							<option value="hata-bildirimi">Hata Bildirimi</option>
							<option value="reklam-isbirligi">Reklam/İşbirliği</option>
							<option value="oneri">Öneri</option>
							<option value="diger">Diğer</option>
						</select>
						{#if errors.subject}
							<p class="mt-1 text-sm text-red-600">{errors.subject}</p>
						{/if}
					</div>

					<!-- Message Field -->
					<div>
						<label for="message" class="mb-2 block text-sm font-semibold text-ink">
							Mesaj <span class="text-red-500">*</span>
						</label>
						<textarea
							id="message"
							bind:value={message}
							rows="5"
							minlength="10"
							class="min-h-[120px] w-full resize-y rounded-xl border px-4 py-3 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 {errors.message
								? 'border-red-300'
								: 'border-slate-300'}"
							placeholder="Mesajınızı buraya yazın..."
							required
						></textarea>
						{#if errors.message}
							<p class="mt-1 text-sm text-red-600">{errors.message}</p>
						{/if}
					</div>

					<!-- Submit Button -->
					<button
						type="submit"
						disabled={isSubmitting}
						class="w-full rounded-xl bg-gradient-to-r from-primary-dark to-primary px-6 py-4 text-base font-semibold text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
					>
						{#if isSubmitting}
							<span class="flex items-center justify-center gap-2">
								<svg
									class="h-5 w-5 animate-spin"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
									></circle>
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Gönderiliyor...
							</span>
						{:else}
							Gönder
						{/if}
					</button>
				</form>
			</div>
		</div>
	{/if}
</div>

