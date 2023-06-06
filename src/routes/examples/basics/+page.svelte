<script lang="ts">
	import Tree from '../../../lib/Tree.svelte';
	//   import tree from "./tree-data.js";
	import TreeItem from './TreeItem.svelte';
	import TreeNode from './TreeNode.svelte';
	import TreeRoot from './TreeRoot.svelte';

	const treeData = {
		props: { id: 'root-node', label: 'root', component: TreeRoot },
		children: [
			{
				props: { id: 'node1', label: 'node1', component: TreeNode },
				children: [
					{ props: { id: 'item1-1', label: 'item1.1', component: TreeItem } },
					{ props: { id: 'item1-2', label: 'item1.2', component: TreeItem } },
					{
						props: { id: 'node11', label: 'node1', component: TreeNode },
						children: [
							{
								props: {
									id: 'item11-1',
									label: 'item11.1',
									component: TreeItem
								}
							},
							{
								props: {
									id: 'item11-2',
									label: 'item11.2',
									component: TreeItem
								}
							}
						]
					}
				]
			},
			{
				props: { id: 'node2', label: 'node2', component: TreeNode },
				children: [
					{ props: { id: 'item2-1', label: 'item2.1', component: TreeItem } },
					{ props: { id: 'item2-2', label: 'item2.2', component: TreeItem } }
				]
			}
		]
	};
</script>

<p>This component is used for ROOT:</p>
<TreeRoot />
<p>This component is used for NODES:</p>
<TreeNode />
<p>This component is used for ITEMS:</p>
<TreeItem />

<p>AND NOT THIS IS THE TREE</p>
<Tree node={treeData} treeName="test-tree" />
