<script lang="ts">
  import { VirtualList, type SlotAttributes } from '$lib/virtuallist';
  import { NodeInfo } from '$lib/NodeInfo.svelte';

  const myModel: Array<NodeInfo> = new Array(10000).fill(1).map(
    (v, i) =>
      new NodeInfo({
        data: { text: 'Item ' + i }
      })
  );

  let itemSize = 25;
</script>

<VirtualList model={myModel} height={500} width="auto" modelCount={myModel.length} {itemSize}>
  {#snippet vl_slot({ item, style, index })}
    <div class="row" {style}>
      {item.data.text}
    </div>
  {/snippet}
</VirtualList>

<style>
</style>
