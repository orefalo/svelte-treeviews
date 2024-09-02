<script lang="ts">
  import Content from './Content.svelte';
  import type { Node, NodeDico } from './types.ts';

  let nodes: NodeDico = $state({
    node1: {
      name: 'node 1',
      items: [{ id: 'node2' }, { id: 'node3' }, { id: 'node4' }],
      id: 'node1'
    },
    node2: {
      name: 'node 2',
      items: [{ id: 'node5' }, { id: 'node6' }, { id: 'node7' }, { id: 'node8' }],
      id: 'node2'
    },
    node3: {
      name: 'node 3',
      items: [{ id: 'node9' }, { id: 'node10' }, { id: 'node11' }, { id: 'node12' }],
      id: 'node3'
    },
    node4: {
      name: 'node 4',
      items: [{ id: 'node13' }, { id: 'node14' }, { id: 'node15' }, { id: 'node16' }],
      id: 'node4',
      color: 'salmon'
    }
  });

  for (let i = 5; i < 17; i++) {
    // svelte-ignore state_referenced_locally
    nodes[`node${i}`] = { id: `node${i}`, name: `item ${i}` };
  }
  // svelte-ignore state_referenced_locally
  nodes['node10'].color = 'steelblue';
  // svelte-ignore state_referenced_locally
  nodes['node11'].color = 'steelblue';
  // svelte-ignore state_referenced_locally
  nodes['node14'].color = 'orange';
  // svelte-ignore state_referenced_locally
  nodes['node15'].color = 'orange';
  // svelte-ignore state_referenced_locally
  nodes['node6'].color = 'forestgreen';
</script>

<h3>Try dragging node2 into node3 and then node4 into node2</h3>
<Content node={nodes.node1} bind:nodes />
