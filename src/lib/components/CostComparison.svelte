<script>
let { totals = { benzin: 0, motorin: 0, lpg: 0 }, activeKey = '' } = $props();

/**
 * @typedef {{ key: string; value: number; width: string; label: string }} ComparisonEntry
 */

let entries = $state(/** @type {ComparisonEntry[]} */ ([]));

$effect(() => {
	const data = Object.entries(totals ?? {});
	const maxValue = Math.max(...data.map(([, value]) => Number(value) || 0), 1);

	entries = data.map(([key, value]) => ({
		key,
		value: Number(value ?? 0),
		width: `${Math.max((Number(value ?? 0) / maxValue) * 100, 5)}%`,
		label: key === 'benzin' ? 'Benzin' : key === 'motorin' ? 'Motorin' : key === 'lpg' ? 'LPG' : key
	}));
});

/**
 * @param {number} value
 */
function formatCost(value) {
		return new Intl.NumberFormat('tr-TR', {
			style: 'currency',
			currency: 'TRY',
			maximumFractionDigits: 2
		}).format(value || 0);
	}
</script>

{#if entries.length}
	<div class="space-y-3 rounded-2xl border border-slate-200 bg-white/80 p-4">
		<div class="flex items-center justify-between">
			<p class="text-sm font-semibold text-ink">Yakıt türüne göre maliyet karşılaştırması</p>
			<span class="text-xs text-slate-400">Güncel pompa değerleri</span>
		</div>

		<div class="space-y-2">
			{#each entries as entry}
				<div class="space-y-1">
					<div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wide">
						<span
							class:active={entry.key === activeKey}
							class="text-slate-500"
						>
							{entry.label}
						</span>
						<span class={entry.key === activeKey ? 'text-primary-dark' : 'text-slate-400'}>
							{formatCost(entry.value)}
						</span>
					</div>
					<div class="relative h-3 overflow-hidden rounded-full bg-slate-100">
						<div
							class={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
								entry.key === activeKey
									? 'bg-primary'
									: 'bg-gradient-to-r from-slate-200 to-slate-300 opacity-80'
							}`}
							style={`width: ${entry.width};`}
						></div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.active {
		color: #0f172a;
	}
</style>

