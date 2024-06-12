<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		table: boolean;
		prepend?: Snippet;
		children: Snippet;
		append?: Snippet;
		class?: string;
		style?: string;
		el: Element;
	}

	let { table = false, prepend, children, append, el = $bindable(), ...rest }: Props = $props();

	//let el = $state<HTMLElement>();
</script>

{#if table}
	<table bind:this={el} {...rest}>
		{#if prepend}
			{@render prepend()}
		{/if}
		<tbody>
			{@render children()}
		</tbody>
		{#if append}
			{@render append()}
		{/if}
	</table>
{:else}
	<div bind:this={el} {...rest}>
		{#if prepend}
			{@render prepend()}
		{/if}
		{@render children()}
		{#if append}
			{@render append()}
		{/if}
	</div>
{/if}
