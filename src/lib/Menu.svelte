<!-- component from https://svelte.dev/repl/3a33725c3adb4f57b46b597f9dade0c1?version=3.25.0 -->

<script context="module">
	export const KEY = {};
</script>

<script lang="ts">
	import { onMount, setContext, createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	import type { TreeContext } from '$lib';

	export let x;
	export let y;

	// whenever x and y is changed, restrict box to be within bounds
	$: ((x, y) => {
		if (!menuEl) return;

		const rect = menuEl.getBoundingClientRect();
		x = Math.min(window.innerWidth - rect.width, x);
		if (y > window.innerHeight - rect.height) y -= rect.height;
	})(x, y);

	const dispatch = createEventDispatcher();

	setContext<TreeContext>(KEY, {
		dispatchClick: () => dispatch('click')
	});

	let menuEl;
	function onPageClick(e) {
		if (e.target === menuEl || menuEl.contains(e.target)) return;
		dispatch('clickoutside');
	}
</script>

<svelte:body on:click={onPageClick} />

<div transition:fade={{ duration: 100 }} bind:this={menuEl} style="top: {y}px; left: {x}px;">
	<slot />
</div>

<style>
	div {
		position: fixed;
		display: grid;
		border: 1px solid #0003;
		box-shadow: 2px 2px 5px 0px #0002;
		background: white;
		z-index: 999;
	}
</style>
