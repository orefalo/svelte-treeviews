<script lang="ts">
  import { Tree } from 'svelte-treeviews';
  import data0 from '../data.json';
  import { NodeInfo } from 'svelte-treeviews/NodeInfo';

  const data = $state(data0);
  const defaultOpen = $state(true);
  const rtl = $state(false);
  const indent = $state(20);
  const btt = $state(false);
  const treeLine = $state(true);
</script>

<div>
  <h3>Base Tree Example</h3>
  <hr />
  <h4>Properties</h4>
  <label>
    <input type="checkbox" value={defaultOpen} />
    defaultOpen
  </label>
  <label>
    <input type="checkbox" value={rtl} />
    rtl
  </label>
  <br />
  <label>
    <input type="checkbox" value={btt} />
    btt (display from bottom to top)
  </label>
  <br />
  <label>
    <input type="checkbox" value={treeLine} />
    Tree Line
  </label>
  <div>
    indent
    <input type="number" value={indent} />
  </div>
  <hr />

  <Tree
    model={data}
    {defaultOpen}
    {rtl}
    {indent}
    {btt}
    {treeLine}
    virtualization={true}
    style="height: 500px">
    {#snippet tree_slot({ data, info }: { data: any; info: NodeInfo })}
      {#if info.children.length}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <span onclick={() => info.toggleExpand()}>{info.expended ? '-' : '+'}</span>
      {/if}
      <input type="checkbox" value={info.checked} onclick={() => info.toggleChecked()} />
      {data.text}
    {/snippet}
  </Tree>
</div>
