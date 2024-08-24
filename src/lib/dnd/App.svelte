<script>
  import Content from './Content.svelte';

  let nodes = {
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
  };

  for (let i = 5; i < 17; i++) {
    nodes[`node${i}`] = { id: `node${i}`, name: `item ${i}` };
  }

  nodes['node10'].color = 'steelblue';
  nodes['node11'].color = 'steelblue';
  nodes['node14'].color = 'orange';
  nodes['node15'].color = 'orange';
  nodes['node6'].color = 'forestgreen';
</script>

<h3>Try dragging node2 into node3 and then node4 into node2</h3>
<Content node={nodes.node1} bind:nodes />
