<script>
	import Node from './Node.svelte';
	let tree = {
		label: 'root',
		children: [
			{
				label: 'node A',
				children: [{ label: 'node Aa' }, { label: 'node Ab', checked: true }]
			},
			{ label: 'node B' },
			{ label: 'node C' },
			{ label: 'node D' }
		]
	};

	const treeMap = {
		/* child label: parent node */
	};
	
	function initTreeMap(tree) {
		if (tree.children) {
			for (const child of tree.children) {
				treeMap[child.label] = tree;
				initTreeMap(child);
			}
		}
	};
	initTreeMap(tree);

	function rebuildChildrenCheckboxes(node, checkAsParent = true) {
		if (node.children) {
			for (const child of node.children) {
				if (checkAsParent) child.checked = !!node.checked;
				rebuildChildrenCheckboxes(child, checkAsParent);
			}
			node.indeterminate =
				node.children.some((c) => c.indeterminate) ||
				(node.children.some((c) => !!c.checked) && node.children.some((c) => !c.checked));
		}
	};

	function rebuildTreeCheckboxes (e, checkAsParent = true) {
		const node = e.detail.node;
		let parent = treeMap[node.label];
		rebuildChildrenCheckboxes(node, checkAsParent);
		while (parent) {
			const allCheck = parent.children.every((c) => !!c.checked);
			if (allCheck) {
				parent.indeterminate = false;
				parent.checked = true;
			} else {
				const haveCheckedOrIndetermine = parent.children.some(
					(c) => !!c.checked || c.indeterminate
				);
				if (haveCheckedOrIndetermine) {
					parent.indeterminate = true;
				} else {
					parent.indeterminate = false;
				}
				parent.checked = false;
			}

			parent = treeMap[parent.label];
		}
		tree = tree;
		// see console the tree state when there's a state changed
		// console.log(tree)
	}
	// init the tree state
	rebuildTreeCheckboxes({detail: { node: tree }}, false);
</script>

<div>
	<Node {tree} on:toggle={rebuildTreeCheckboxes} />
</div>

<style>
</style>
