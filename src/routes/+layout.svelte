<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CookieConsent from '$lib/components/CookieConsent.svelte';

	export const ssr = true;

	let { children, data } = $props();

	/** @type {any} */
	let layoutData;

	$effect(() => {
		layoutData = data;
	});

	const fallbackSeo = {
		title: 'TR-Pratik | Türkiye İçin Anlık Hesaplama Araçları',
		description:
			'Yakıt maliyeti ve diğer pratik hesaplamalar için optimize edilmiş araçlar koleksiyonu.',
		canonical: ''
	};

	const defaultSeo = $derived({
		...fallbackSeo,
		...(layoutData?.defaultSeo ?? {})
	});

	const incomingSeo = $derived(layoutData?.seo ?? {});

	const seo = $derived({
		...defaultSeo,
		...incomingSeo
	});

	const schemaPayload = $derived(seo.schema ?? layoutData?.defaultSeo?.schema ?? null);

	const schemaJson = $derived(
		schemaPayload && typeof schemaPayload === 'string'
			? schemaPayload
			: schemaPayload
				? JSON.stringify(schemaPayload)
				: null
	);

	const siteName = $derived(layoutData?.site?.name ?? 'TR-Pratik');
	const tagline = $derived(layoutData?.site?.tagline ?? 'Türkiye için hızlı sonuçlar');

	let canonicalHref = $state('');

	$effect(() => {
		const baseUrl = layoutData?.site?.baseUrl ?? '';
		const currentPath = layoutData?.site?.currentPath ?? '/';

		if (baseUrl) {
			try {
				const url = new URL(currentPath || '/', baseUrl);
				url.search = '';
				url.hash = '';
				canonicalHref = url.toString();
				return;
			} catch {
				// fall through to fallback below
			}
		}

		const fallback = (seo.canonical ?? '').split('?')[0] || currentPath || '/';
		canonicalHref = fallback;
	});

	onMount(() => {
		console.log(
			'%c Developed by Tahsin Mert Mutlu 🚀 ',
			'background: #2563eb; color: #fff; padding: 4px; border-radius: 4px; font-weight: bold;'
		);
		console.log('Looking for a developer? Contact me!');
	});
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="author" content="Tahsin Mert Mutlu" />
	<link rel="canonical" href={canonicalHref} />
	<link rel="icon" href="/favicon.png" sizes="any" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content="tr_TR" />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:url" content={canonicalHref} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	{#if schemaJson}
		<script type="application/ld+json">
			{schemaJson}
		</script>
	{/if}
</svelte:head>

<div class="app-container bg-slate-50 text-ink">
	<Navbar />

	<main class="flex-1">
		<div class="mx-auto w-full max-w-5xl px-4 py-10 pt-4">
			{@render children()}
		</div>
	</main>

	<Footer />
</div>

<CookieConsent />
