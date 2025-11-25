<script>
	import LoanCalculator from '$lib/components/LoanCalculator.svelte';
	import PaymentTable from '$lib/components/PaymentTable.svelte';

	export const ssr = true;

	let { data } = $props();
</script>

<LoanCalculator {data} />
<div class="mt-10">
	<PaymentTable
		amount={data?.loan?.amount}
		term={data?.loan?.term}
		rate={data?.loan?.rate}
	/>
</div>

