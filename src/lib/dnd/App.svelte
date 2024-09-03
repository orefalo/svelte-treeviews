<script lang="ts">
  import Content from './Content.svelte';
  import type { Node, NodeDico } from './types.ts';

  let tree: NodeDico = $state({
    node1: {
      name: 'node 1',
      children: [{ id: 'node2' }, { id: 'node3' }, { id: 'node4' }],
      id: 'node1'
    },
    node2: {
      name: 'node 2',
      children: [{ id: 'node5' }, { id: 'node6' }, { id: 'node7' }, { id: 'node8' }],
      id: 'node2'
    },
    node3: {
      name: 'node 3',
      children: [{ id: 'node9' }, { id: 'node10' }, { id: 'node11' }, { id: 'node12' }],
      id: 'node3'
    },
    node4: {
      name: 'node 4',
      children: [{ id: 'node13' }, { id: 'node14' }, { id: 'node15' }, { id: 'node16' }],
      id: 'node4',
      color: 'salmon'
    }
  });

  for (let i = 5; i < 17; i++) {
    // svelte-ignore state_referenced_locally
    tree[`node${i}`] = { id: `node${i}`, name: `item ${i}` };
  }
  // svelte-ignore state_referenced_locally
  tree['node10'].color = 'steelblue';
  // svelte-ignore state_referenced_locally
  tree['node11'].color = 'steelblue';
  // svelte-ignore state_referenced_locally
  tree['node14'].color = 'orange';
  // svelte-ignore state_referenced_locally
  tree['node15'].color = 'orange';
  // svelte-ignore state_referenced_locally
  tree['node6'].color = 'forestgreen';
</script>

<h3>Try dragging node2 into node3 and then node4 into node2</h3>
<Content node={tree.node1} bind:tree />
