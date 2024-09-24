<script lang="ts">
  import { TreeProcessor } from './TreeProcessor';
  import Node from './Node.svelte';
  import { type NodeI, type NodeIDico } from './NodeI.svelte';
  import { PerformanceNodeTiming } from 'node:perf_hooks';

  let data = {
    label: 'root',
    children: [
      {
        label: 'node A',
        children: [{ label: 'node Aa' }, { label: 'node Ab' }]
      },
      { label: 'node B' },
      { label: 'node C' },
      { label: 'node D' }
    ]
  };

  // TODO: turn into an array<nodeI>
  let tree: NodeI = $state();

  // TODO: replace with, add a parent to NodeI, which will require preprocessing
  // used to find parents, child label -> parent
  // const treeMap: NodeIDico = {
  //   /* child label: parent node */
  // };

  function initTreeMap() {
    // if (t.children) {
    //   for (const child of t.children) {
    //     treeMap[child.label] = t;
    //     initTreeMap(child);
    //   }
    // }

    const proc = new TreeProcessor();
    tree = proc.init(data);
  }

  initTreeMap();

  function rebuildChildrenCheckboxes(node: NodeI, checkAsParent = true) {
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

  function rebuildTreeCheckboxes(tree: NodeI, checkAsParent: boolean = true): void {
    //todo remove
    // const node = tree;
    // let parent = treeMap[tree.label];
    let parent = tree.parent;
    rebuildChildrenCheckboxes(tree, checkAsParent);
    while (parent) {
      const allCheck = parent.children?.every(c => !!c.checked);
      if (allCheck) {
        parent.indeterminate = false;
        parent.checked = true;
      } else {
        const haveCheckedOrIndeterminacy = parent.children?.some(
          c => !!c.checked || c.indeterminate
        );
        parent.indeterminate = !!haveCheckedOrIndeterminacy;
        parent.checked = false;
      }

      // parent = treeMap[parent.label];
      parent = parent.parent;
    }
  }

  // init the tree state
  function upd() {
    if (tree) rebuildTreeCheckboxes(tree, false);
  }

  upd();
</script>

<div>
  <Node bind:tree ontoggle={rebuildTreeCheckboxes} />
</div>

<style>
</style>
