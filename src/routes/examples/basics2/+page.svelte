<script lang="ts">
	import TreeView from '../../../lib/old/TreeView.svelte';

	import { mergeTrees } from '../../../lib/old/TreeHelpers';

	import MenuDivider from '../../../lib/old/MenuDivider.svelte';
	import MenuOption from '../../../lib/old/MenuOption.svelte';

	let tree = [
		{
			nodePath: '1',
			title: '1',
			__visual_state: 'indeterminate',
			__useCallback: true,
			hasChildren: true,
			checkboxVisible: true
		},
		{ nodePath: '2', title: '2', isDraggable: false, checkboxVisible: false },

		{ nodePath: '3', title: '3', hasChildren: true },
		{ nodePath: '3.4', title: '	Omniknight' },
		{ nodePath: '4', hasChildren: true },
		{ nodePath: '4.1', priority: 0, title: 'ITEM_1' },
		{ nodePath: '4.6', priority: 6, title: 'ITEM_2', insertDisabled: true },
		{ nodePath: '4.2', priority: 2, title: 'ITEM_3', checkboxVisible: false },
		{
			nodePath: '4.3',
			priority: 3,
			title: 'ITEM_4',
			nestDisabled: true,
			checkboxVisible: true
		},
		{ nodePath: '4.4', priority: 4, title: 'ITEM_5', dropDisabled: true },
		{
			nodePath: '4.5',
			priority: 10,
			title: 'ITEM_6',
			isDraggable: false,
			checkboxVisible: true
		}
	];

	let treeToAdd = [
		{ nodePath: '3.1', title: 'Hecarim' },
		{ nodePath: '3.2', title: '3.2', hasChildren: true },
		{
			nodePath: '3.2.2',
			title: 'Visage',
			test: 'test223'
		},
		{
			nodePath: '3.2.3',
			title: 'Lycan',
			__selected: true,
			test: 'test223',
			checkboxVisible: true
		},
		{
			nodePath: '3.2.4',
			title: 'Bloodseeker',
			__selected: true
		},

		{ nodePath: '3.3', title: '3.3', hasChildren: true },

		{
			nodePath: '3.3.1',
			title: '3.3.1',
			__selected: false
		}
	];

	let dragAndDrop = true,
		showContexMenu = true,
		enableVerticalLines = true,
		num = 0,
		thisTree,
		expandedLevel,
		treeClass;

	async function callback(n) {
		console.log('callback from ' + n.nodePath);
		let data = await [
			{
				nodePath: n.nodePath + '.' + ++num,
				priority: 0,
				__useCallback: true,
				hasChildren: true
			},
			{
				nodePath: n.nodePath + '.' + ++num,
				priority: 0,
				__useCallback: true,
				hasChildren: true
			}
		];
		return data;
	}

	function handleClick(node) {
		console.log(node.nodePath);
		tree = tree.filter((n) => n.nodePath != node.nodePath);
	}

	function beforeCallback(node, oldParent, targetNode, nest) {
		// alert(
		// 	`moved ${node?.nodePath} from ${oldParent?.nodePath} to ${
		// 		targetNode?.nodePath
		// 	} while ${nest ? "nesting" : "not nesting"}`
		// );
	}

	function dragCallback(movedNode, oldParent, targetNode) {
		if (targetNode.nodePath.includes('1')) return false;
	}

	function addTo() {
		tree = mergeTrees(tree, treeToAdd);
	}

	let recursive = true,
		leafNodeCheckboxesOnly = true,
		checkboxesDisabled = true,
		checkboxes = 'all';
</script>

<h1>Page for testing</h1>
<br />
dragAndDrop<input type="checkbox" bind:checked={dragAndDrop} /><br />
showContexMenu<input type="checkbox" bind:checked={showContexMenu} /><br />
enableVerticalLines<input type="checkbox" bind:checked={enableVerticalLines} /><br />
expandedLevel<input type="number" bind:value={expandedLevel} /><br />

recursive:<input type="checkbox" bind:checked={recursive} /> <br />
leafNodeCheckboxesOnly:<input type="checkbox" bind:checked={leafNodeCheckboxesOnly} /> <br />
checkboxesDisabled:<input type="checkbox" bind:checked={checkboxesDisabled} /><br />
checkboxes:<select bind:value={checkboxes}>
	<option value="all" selected>all</option>
	<option value="perNode">perNode</option>
	<option value="none">none</option>
</select> <br />
tree class<input type="text" bind:value={treeClass} />
<br />
<button on:click={addTo}> add</button>

<button on:click={thisTree.changeAllExpansion(true)}> true</button>
<button on:click={thisTree.changeAllExpansion(false)}> false</button>
<button on:click={thisTree.changeAllExpansion(undefined)}> delete all expansion</button>

<TreeView
	bind:this={thisTree}
	bind:tree
	treeId="tree"
	let:node
	maxExpandedDepth={4}
	bind:filteredTree={tree}
	on:selection={(e) => console.log(e.detail)}
	on:expansion={(e) => console.log(e.detail)}
	on:moved={(e) => console.log(e.detail)}
	bind:dragAndDrop
	{showContexMenu}
	expandCallback={callback}
	beforeMovedCallback={beforeCallback}
	dragEnterCallback={dragCallback}
	{enableVerticalLines}
	bind:expandedLevel
	{recursive}
	{leafNodeCheckboxesOnly}
	{checkboxesDisabled}
	{checkboxes}
	{treeClass}
>
	{JSON.stringify(node)}

	<svelte:fragment slot="context-menu" let:node>
		<MenuOption text={node.nodePath} isDisabled />
		<MenuDivider />
		<MenuOption text="alert object" on:click={() => alert(JSON.stringify(node))} />
		<MenuOption text="delete node" on:click={() => handleClick(node)} />
	</svelte:fragment>
</TreeView>

<style>
</style>
