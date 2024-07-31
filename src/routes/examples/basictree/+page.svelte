<script setup lang="ts">
  import { Tree } from 'svelte-treeviews';

  import data0 from '../data.json';

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
    {#snippet tree_slot({ data, info })}
      {#if info.children.length}
        <span>{info.open ? '-' : '+'}</span>
      {/if}
      <input type="checkbox" value={info.checked} onclick={() => (info.open = !info.open)} />
      {data.text}
    {/snippet}
  </Tree>
</div>

<style>
</style>
