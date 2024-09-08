<script lang="ts">
  import Node from './Node.svelte';
  import { type NodeI } from './NodeI';

  let tree = $state({
    label: 'root',
    expanded: true,
    children: [
      {
        label: 'node A',
        children: [{ label: 'node Aa' }, { label: 'node Ab', checked: true }]
      },
      { label: 'node B' },
      { label: 'node C' },
      { label: 'node D' }
    ]
  });

  // used to find parents
  const treeMap = {
    /* child label: parent node */
  };

  function initTreeMap(t: NodeI = tree) {
    if (t.children) {
      for (const child of t.children) {
        treeMap[child.label] = t;
        initTreeMap(child);
      }
    }
  }

  initTreeMap();

  function rebuildChildrenCheckboxes(node:NodeI, checkAsParent = true) {
    if (node.children) {
      for (const child of node.children) {
        if (checkAsParent) child.checked = !!node.checked;
        rebuildChildrenCheckboxes(child, checkAsParent);
      }
      node.indeterminate =
        node.children.some(c => c.indeterminate) ||
        (node.children.some(c => !!c.checked) && node.children.some(c => !c.checked));
    }
  }

  function rebuildTreeCheckboxes(e: { tree: NodeI }, checkAsParent: boolean = true): void {
    const node = e.tree;
    let parent = treeMap[node.label];
    rebuildChildrenCheckboxes(node, checkAsParent);
    while (parent) {
      const allCheck = parent.children.every(c => !!c.checked);
      if (allCheck) {
        parent.indeterminate = false;
        parent.checked = true;
      } else {
        const haveCheckedOrIndeterminacy = parent.children.some(c => !!c.checked || c.indeterminate);
        parent.indeterminate = !!haveCheckedOrIndeterminacy;
        parent.checked = false;
      }
      parent = treeMap[parent.label];
    }
  }
  // init the tree state
  rebuildTreeCheckboxes({ tree: tree }, false);
</script>

<div>
  <Node bind:tree={tree} ontoggle={rebuildTreeCheckboxes} />
</div>

<style>
</style>
