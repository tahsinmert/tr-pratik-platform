<script>
	import { locale } from '$lib/stores/i18n';

	let isOpen = $state(false);

	function handleClickOutside(event) {
		if (event.target.closest('[data-language-switcher]') === null) {
			isOpen = false;
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});
</script>

<div class="relative" data-language-switcher>
	<button
		type="button"
		class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
		onclick={() => (isOpen = !isOpen)}
		aria-label="Change language"
		aria-expanded={isOpen}
	>
		<span class="text-lg">{$locale === 'tr' ? '🇹🇷' : '🇬🇧'}</span>
		<span class="hidden sm:inline">{$locale === 'tr' ? 'TR' : 'EN'}</span>
	</button>

	{#if isOpen}
		<div
			class="absolute right-0 top-full z-50 mt-2 w-36 rounded-lg border border-slate-200 bg-white shadow-lg"
			role="menu"
		>
			<button
				type="button"
				class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg {$locale === 'tr'
					? 'bg-slate-50 text-primary-dark'
					: ''}"
				role="menuitem"
				onclick={() => {
					locale.set('tr');
					isOpen = false;
				}}
			>
				<span class="text-lg">🇹🇷</span>
				<span>Türkçe</span>
				{#if $locale === 'tr'}
					<svg
						class="ml-auto h-4 w-4 text-primary"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
			</button>
			<button
				type="button"
				class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg {$locale === 'en'
					? 'bg-slate-50 text-primary-dark'
					: ''}"
				role="menuitem"
				onclick={() => {
					locale.set('en');
					isOpen = false;
				}}
			>
				<span class="text-lg">🇬🇧</span>
				<span>English</span>
				{#if $locale === 'en'}
					<svg
						class="ml-auto h-4 w-4 text-primary"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
			</button>
		</div>
	{/if}
</div>

