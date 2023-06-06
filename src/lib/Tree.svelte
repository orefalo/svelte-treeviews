<script>
	import { writable } from 'svelte/store';
	import writableIndexedDB from '@stroblp/svelte-persistent-writable';

	export let treeName = 'tree-view';
	export let driver = 'INDEXEDDB';
	export let dbName = 'svelte-tree-db';
	export let parentNodeState = writable(false);
	export let node;
	export let level = 0;
	export let parent = undefined;

	let childNodeList = writable({
		checked: new Set([]),
		indeterminate: new Set([])
	});

	export let childToParentList = writable({
		checked: new Set([]),
		indeterminate: new Set([])
	});

	let currentNodeIndeterminate = false;

	let currentNodeState = writableIndexedDB(node.props.id + '-current-node-state', node.props.defaultVisible, {
		driver,
		storeName: treeName,
		dbName
	});
	let nodeExpanded = writableIndexedDB(node.props.id + '-current-node-expansion-state', true, {
		driver,
		storeName: treeName,
		dbName
	});

	if (node.children) {
		let childCount = node.children.length;

		childNodeList.subscribe((value) => {
			// console.log(value);

			if (value.checked.size === 0) {
				$currentNodeState = false;
				currentNodeIndeterminate = false;
				$childToParentList.indeterminate.delete(node.props.id);
			} else if (value.checked.size === childCount) {
				$currentNodeState = true;
				currentNodeIndeterminate = false;
				$childToParentList.indeterminate.delete(node.props.id);
			} else {
				currentNodeIndeterminate = true;
				$childToParentList.indeterminate.add(node.props.id);
			}
			if (value.indeterminate.size > 0) {
				currentNodeIndeterminate = true;
				$childToParentList.indeterminate.add(node.props.id);
			}

			$childToParentList = $childToParentList;
		});
	}

	currentNodeState.subscribe((value) => {
		if (value) {
			$childToParentList.checked.add(node.props.id);
		} else {
			$childToParentList.checked.delete(node.props.id);
		}
		$childToParentList = $childToParentList;
		// console.log($childToParentList);
	});

	parentNodeState.subscribe((value) => {
		$currentNodeState = value;
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
</svelte:head>
<ul class:root={level === 0}>
	{#if node.children}
		<li>
			<div class="container">
				<div class="main">
					{#if nodeExpanded}
						<input
							type="checkbox"
							class="expansion-control"
							id={'expansion-controls-' + node.props.id}
							bind:checked={$nodeExpanded}
						/>
						<label for={'expansion-controls-' + node.props.id} class="l1 fas" />
					{/if}
					<input
						type="checkbox"
						id={node.props.id}
						bind:checked={$currentNodeState}
						bind:indeterminate={currentNodeIndeterminate}
					/>
					<label for={node.props.id}>{node.props.label}</label>
					{#if node.props.component}
						<svelte:component this={node.props.component} controlChecked={$currentNodeState} props={node.props} />
					{/if}
				</div>
			</div>
		</li>
		<li class="expandable" class:expanded={$nodeExpanded}>
			{#each node.children as child}
				<svelte:self
					parent={node.props.id}
					node={child}
					parentNodeState={currentNodeState}
					level={level + 1}
					childToParentList={childNodeList}
					{treeName}
					{driver}
				/>
			{/each}
		</li>
	{:else}
		<li>
			<div class="container">
				<div class="main">
					<input
						type="checkbox"
						id={'item-' + node.props.id}
						bind:checked={$currentNodeState}
						bind:indeterminate={currentNodeIndeterminate}
					/>
					<label for={'item-' + node.props.id}>{node.props.label}</label>

					<div>
						{#if node.props.component}
							{#key node}
								<svelte:component
									this={node.props.component}
									controlChecked={$currentNodeState}
									{parent}
									props={node.props}
								/>
							{/key}
						{/if}
					</div>
				</div>
			</div>
		</li>
	{/if}
</ul>

<style>
	label {
		padding-left: 2px;
		padding-right: 4px;
	}
	:global(input[type='checkbox']) {
		align-self: flex-end;
		/* display:flex;
        justify-content: center;
        align-items: flex-end; */
	}

	.container {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.main {
		display: flex;
		justify-content: left;
		align-items: baseline;
	}

	.expansion-control {
		display: none;
	}

	.expansion-control + label:before {
		content: '\f0a9';
	}

	.expansion-control:checked + label:before {
		content: '\f0ab';
	}

	.expandable.expanded {
		display: block;
	}

	.expandable {
		display: none;
	}

	ul {
		list-style-type: none;
		padding-left: 30px;
	}

	ul.root {
		list-style-type: none;
		padding-left: 0px;
	}
</style>
