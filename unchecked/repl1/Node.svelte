<script>
	import { createEventDispatcher } from 'svelte';

	export let tree;
	const dispatch = createEventDispatcher();
	const toggleExpansion = () => {
		tree.expanded = !tree.expanded;
	};

	const toggleCheck = () => {
		// update the current node's state here, the UI only need to represent it, 
		// don't need to bind the check state to the UI
		tree.checked = !tree.checked;
		
		// emit node 'toggle' event, notify parent compnent to rebuild the entire tree's state
		dispatch('toggle', {
			node: tree
		});
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
<ul>
	<li>
		{#if tree.children}
			<input
				type="checkbox"
				data-label={tree.label}
				checked={tree.checked}
				indeterminate={tree.indeterminate}
				on:click={toggleCheck}
			/>

			<span on:click={toggleExpansion} class="arrow" class:arrowDown={tree.expanded} />
			<span on:click={toggleCheck}>
				{tree.label}
			</span>
			{#if tree.expanded}
				{#each tree.children as child}
					<svelte:self tree={child} on:toggle />
				{/each}
			{/if}
		{:else}
			<input
				type="checkbox"
				data-label={tree.label}
				checked={tree.checked}
				indeterminate={tree.indeterminate}
				on:click={toggleCheck}
			/>
			<span on:click={toggleCheck}>
				{tree.label}
			</span>
		{/if}
	</li>
</ul>

<style>
	ul {
		margin: 0;
		list-style: none;
		padding-left: 1.2rem;
		user-select: none;
	}
	.arrow::before {
		--tw-content: '+';
    content: var(--tw-content);	
	display: inline-block;
    cursor: pointer;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 1rem;
    line-height: 1.5rem;
	}
	.arrowDown::before {
		--tw-content: '-';
    content: var(--tw-content);
	}
</style>
