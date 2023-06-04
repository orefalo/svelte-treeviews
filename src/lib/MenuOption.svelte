<script lang="ts">
	import { getContext } from 'svelte';
	import { KEY } from './Menu.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { MenuContext } from '$lib';

	export let isDisabled = false;
	export let text = '';

	const dispatch = createEventDispatcher();

	const { dispatchClick } = getContext<MenuContext>(KEY);

	const handleClick = (e) => {
		if (isDisabled) return;

		dispatch('click');
		//TODO: the event should be enough
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
