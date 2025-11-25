<script>
	import { page } from '$app/stores';
	import { t } from '$lib/stores/i18n';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';

	const links = [
		{ href: '/', key: 'navbar.home' },
		{ href: '/hesapla/yakit-tuketimi/', key: 'navbar.fuelCalculation' },
		{ href: '/hesapla/kredi/', key: 'navbar.creditCalculation' },
		{ href: '/hesapla/kdv/hesaplama', key: 'navbar.vatCalculation' },
		{ href: '/iletisim/', key: 'navbar.contact' }
	];

	let isMenuOpen = $state(false);

	const pathname = $derived($page.url.pathname ?? '/');

	/**
	 * @param {string} href
	 */
	function isActive(href) {
		if (href === '/') {
			return pathname === '/';
		}

		return pathname.startsWith(href);
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header class="sticky top-0 z-50 bg-white shadow-sm">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
		<a
			href="/"
			class="flex items-center gap-3 text-lg font-extrabold tracking-tight bg-gradient-to-r from-primary-dark to-primary text-transparent bg-clip-text"
			onclick={closeMenu}
		>
			<img src="/favicon.png" alt="TR-Pratik Logo" class="h-8 w-8 object-contain" />
			TR-Pratik
		</a>

		<div class="hidden items-center gap-6 md:flex">
			<nav class="flex items-center gap-6 text-sm font-semibold text-slate-600">
				{#each links as link}
					<a
						href={link.href}
						class={`transition hover:text-primary-dark ${
							isActive(link.href) ? 'text-primary-dark' : ''
						}`}
					>
						{$t(link.key)}
					</a>
				{/each}
			</nav>
			<LanguageSwitcher />
		</div>

		<div class="flex items-center gap-3 md:hidden">
			<LanguageSwitcher />
			<button
				type="button"
				class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-primary hover:text-primary"
				onclick={toggleMenu}
				aria-label={$t('navbar.menuToggle')}
				aria-expanded={isMenuOpen}
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					{#if isMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	{#if isMenuOpen}
		<div class="border-t border-slate-100 bg-white md:hidden">
			<nav class="mx-auto flex max-w-7xl flex-col px-4 py-3 text-sm font-semibold text-slate-600">
				{#each links as link}
					<a
						href={link.href}
						class={`rounded-xl px-3 py-2 transition hover:bg-slate-50 ${
							isActive(link.href) ? 'text-primary-dark' : ''
						}`}
						onclick={closeMenu}
					>
						{$t(link.key)}
					</a>
				{/each}
			</nav>
		</div>
	{/if}
</header>

