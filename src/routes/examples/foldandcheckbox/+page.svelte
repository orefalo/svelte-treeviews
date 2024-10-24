<script lang="ts">
  import { Tree } from 'svelte-treeviews';
  import data0 from '../data.json';
  import { NodeInfo } from 'svelte-treeviews/NodeInfo.svelte';

  let data = $state(data0);
  let defaultOpen = $state(true);
  let rtl = $state(false);
  let indent = $state(20);
  let btt = $state(false);
  let virtualization = $state(true);
  let treeLine = $state(true);

  let listStyle = $derived.by(() => (virtualization ? 'height:500px' : 'height: auto'));
</script>

<div>
  <h3>Base Tree Example</h3>
  <hr />
  <h4>Properties</h4>
  <label>
    <input type="checkbox" bind:checked={defaultOpen} />
    defaultOpen
  </label>
  <label>
    <input type="checkbox" bind:checked={treeLine} />
    tree line
  </label>
  <br />
  <label>
    <input type="checkbox" bind:checked={rtl} />
    rtl (right to left)
  </label>
  <label>
    <input type="checkbox" bind:checked={btt} />
    btt (display from bottom to top)
  </label>
  <br />
  <label>
    <input type="checkbox" bind:checked={virtualization} />
    virtualization
  </label>
  <br />

  <div>
    indent
    <input type="number" bind:value={indent} />
  </div>
  <hr />

  <Tree
    model={data}
    bind:defaultOpen
    bind:rtl
    bind:indent
    bind:btt
    bind:treeLine
    bind:virtualization
    style={listStyle}>
    {#snippet tree_slot({ data, info }: { data: any; info: NodeInfo })}
      {#if info.children.length}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <span onclick={() => info.toggleExpand()}>{info.expended ? '-' : '+'}</span>
      {/if}
      <input type="checkbox" bind:checked={info.checked} onclick={() => info.toggleChecked()} />
      {data.text}
    {/snippet}
  </Tree>
</div>
