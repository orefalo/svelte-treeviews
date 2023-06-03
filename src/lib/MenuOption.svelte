<script lang="ts">
	import { getContext } from 'svelte';
	import { KEY } from './Menu.svelte';

	export let isDisabled = false;
	export let text = '';

	import { createEventDispatcher } from 'svelte';
	import type { TreeContext } from '$lib';
	const dispatch = createEventDispatcher();

	const { dispatchClick } = getContext<TreeContext>(KEY);

	const handleClick = (e) => {
		if (isDisabled) return;

		dispatch('click');
		dispatchClick();
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class:disabled={isDisabled} on:click={handleClick}>
	{#if text}
		{text}
	{:else}
		<slot />
	{/if}
</div>

<style>
	div {
		padding: 4px 15px;
		cursor: default;
		font-size: 14px;
		display: flex;
		align-items: center;
		grid-gap: 5px;
	}
	div:hover {
		background: #0002;
	}
	div.disabled {
		color: #0006;
	}
	div.disabled:hover {
		background: white;
	}
</style>
