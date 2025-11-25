<script>
	import { formatAmount } from '$lib/utils/loan';

	let { amount = 0, term = 0, rate = 0 } = $props();

	const currencyFormatter = new Intl.NumberFormat('tr-TR', {
		style: 'currency',
		currency: 'TRY',
		maximumFractionDigits: 2
	});

	function formatCurrency(value) {
		return currencyFormatter.format(value || 0);
	}

	function buildSchedule() {
		const principal = Number(amount) || 0;
		const months = Math.max(Number(term) || 0, 1);
		const monthlyRate = (Number(rate) || 0) / 100;

		let monthlyPayment = 0;
		if (monthlyRate === 0) {
			monthlyPayment = months ? principal / months : 0;
		} else {
			const factor = Math.pow(1 + monthlyRate, months);
			monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
		}

		let remaining = principal;
		const rows = [];

		for (let month = 1; month <= months; month += 1) {
			const interestPayment = monthlyRate === 0 ? 0 : remaining * monthlyRate;
			let principalPayment = monthlyPayment - interestPayment;

			if (month === months) {
				principalPayment = remaining;
			}

			const remainingAfterPayment = Math.max(remaining - principalPayment, 0);

			rows.push({
				month,
				monthlyPayment,
				interestPayment,
				principalPayment,
				remainingDebt: remainingAfterPayment
			});

			remaining = remainingAfterPayment;
		}

		return rows;
	}

	const schedule = $derived(buildSchedule());
</script>

<details class="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-card">
	<summary class="cursor-pointer text-sm font-semibold text-slate-700">
		📄 Detaylı Ödeme Planını Göster (Tablo)
	</summary>

	{#if !amount || !term}
		<p class="text-sm text-slate-500">Ödeme planını görmek için kredi tutarı ve vade seçiniz.</p>
	{:else}
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead class="bg-slate-100 text-left text-xs uppercase text-slate-500">
					<tr>
						<th class="px-4 py-3 font-semibold">Taksit No</th>
						<th class="px-4 py-3 font-semibold">Taksit Tutarı</th>
						<th class="px-4 py-3 font-semibold">Ana Para</th>
						<th class="px-4 py-3 font-semibold">Faiz</th>
						<th class="px-4 py-3 font-semibold">Kalan Borç</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-100 text-slate-700">
					{#each schedule as row}
						<tr class="odd:bg-slate-50">
							<td class="px-4 py-3 font-semibold">{row.month}</td>
							<td class="px-4 py-3">{formatCurrency(row.monthlyPayment)}</td>
							<td class="px-4 py-3">{formatCurrency(row.principalPayment)}</td>
							<td class="px-4 py-3">{formatCurrency(row.interestPayment)}</td>
							<td class="px-4 py-3">{formatAmount(row.remainingDebt)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</details>



