<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let isVisible = $state(false);

	onMount(() => {
		// Check if user has already made a choice
		const consent = localStorage.getItem('cookie_consent');
		if (!consent) {
			isVisible = true;
		}
	});

	function accept() {
		localStorage.setItem('cookie_consent', 'accepted');
		isVisible = false;
	}

	function decline() {
		localStorage.setItem('cookie_consent', 'declined');
		isVisible = false;
	}
</script>

{#if isVisible}
	<div
		class="fixed bottom-0 left-0 right-0 z-50 p-4 md:bottom-4 md:left-auto md:right-4 md:max-w-md"
		transition:fly={{ y: 100, duration: 300 }}
	>
		<div
			class="rounded-xl border border-slate-200 bg-white p-6 shadow-2xl"
		>
			<p class="mb-4 text-sm leading-relaxed text-slate-700">
				Sizlere daha iyi hizmet sunmak için çerezleri kullanıyoruz. Detaylı bilgi için
				<a
					href="/yasal/cerez-politikasi"
					class="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
				>
					Çerez Politikamızı
				</a>
				inceleyebilirsiniz.
			</p>
			<div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
				<button
					type="button"
					onclick={decline}
					class="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:underline sm:order-2"
				>
					Reddet
				</button>
				<button
					type="button"
					onclick={accept}
					class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700 sm:order-1"
				>
					Kabul Et
				</button>
			</div>
		</div>
	</div>
{/if}

