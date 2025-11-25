<script>
	import { slugify } from '$lib/utils';

	const defaultRoutes = [
		{ origin: 'İstanbul', destination: 'Ankara' },
		{ origin: 'İstanbul', destination: 'İzmir' },
		{ origin: 'İzmir', destination: 'Antalya' },
		{ origin: 'Ankara', destination: 'İzmir' },
		{ origin: 'İstanbul', destination: 'Bursa' },
		{ origin: 'Bursa', destination: 'Antalya' },
		{ origin: 'Ankara', destination: 'Konya' },
		{ origin: 'İstanbul', destination: 'Kayseri' }
	];

	let { routes = defaultRoutes, title = 'Popüler yakıt rotaları' } = $props();

	const links = $derived(
		(routes ?? defaultRoutes)
			.filter((route) => route?.origin && route?.destination && route.origin !== route.destination)
			.map((route) => {
				const originSlug = slugify(route.origin);
				const destinationSlug = slugify(route.destination);
				return {
					label: `${route.origin} ➜ ${route.destination}`,
					href: `/hesapla/${originSlug}-${destinationSlug}-yakit-hesaplama/`
				};
			})
	);
</script>

{#if links.length}
	<nav aria-label="Popüler şehirler arası yakıt hesaplama bağlantıları" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
		<div class="mb-4 space-y-1 text-center sm:text-left">
			<p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary-dark">SEO iç bağlantılar</p>
			<h2 class="text-2xl font-bold text-ink">{title}</h2>
			<p class="text-sm text-slate-500">
				Bu güzergâhları kullanarak şehirler arası yakıt tüketimini doğrudan hesaplayabilirsiniz.
			</p>
		</div>

		<ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each links as link}
				<li>
					<a
						class="flex h-full items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-primary-dark transition hover:border-primary hover:bg-white"
						href={link.href}
					>
						<span>{link.label}</span>
						<span aria-hidden="true">→</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}


