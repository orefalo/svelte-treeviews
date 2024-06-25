<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, watch = {} }: { children: Snippet; watch: any } = $props();

	let key = $state(0);
	$effect(() => {
		key = Math.random();
	});
	$effect(() => watch);
</script>

<div {key}>
	{@render children()}
</div>
