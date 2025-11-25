<script>
	import LoanCalculator from '$lib/components/LoanCalculator.svelte';

	export const ssr = true;

	let { data } = $props();
</script>

<LoanCalculator {data} />


