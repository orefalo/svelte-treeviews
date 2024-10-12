<script lang="ts">
  import { VirtualList } from '$lib/virtuallist';
  import { NodeInfo } from '$lib/NodeInfo.svelte';

  const myModel: Array<NodeInfo> = new Array(10000).fill(1).map(
    (v, i) =>
      new NodeInfo({
        data: { text: 'Item ' + i }
      })
  );

  // let itemSize = () => 25;
</script>

<VirtualList items={myModel} style="height:600px">
  {#snippet vl_slot({ item, index })}
    <div style="border: 1px solid rgb(204, 204, 204)">
      {JSON.stringify(item)}
    </div>
  {/snippet}
</VirtualList>
