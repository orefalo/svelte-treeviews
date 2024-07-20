<script setup lang="ts">
  import { Tree } from 'svelte-treeviews';
  import OpenIcon from '$lib/OpenIcon.svelte';

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

  <Tree class="mtl-tree" model={data} {defaultOpen} {rtl} {indent} {btt} {treeLine}>
    {#snippet tree_slot({ data, info })}
      {#if info.children.length}
        <OpenIcon open={info.open} class="mtl-mr" onclick={() => (info.open = !info.open)} />
      {/if}
      <input class="mtl-checkbox mtl-mr" type="checkbox" value="stat.checked" />
      <span class="mtl-ml">{data.text}</span>
    {/snippet}
  </Tree>
</div>

<style>
  .mtl-tree .tree-node-inner {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .mtl-tree .tree-node {
    padding: 1px 0;
  }

  .mtl-tree .tree-node:hover {
    background-color: #ededed;
    /* recommend: active #ddeff9, active & hover: #cfe6f2 */
  }

  .mtl-checkbox {
    width: 14px;
    height: 14px;
  }

  .mtl-ml {
    margin-left: 4px;
  }

  .mtl-mr {
    margin-right: 4px;
  }

  .mtl-text-left {
    text-align: left;
  }

  .mtl-text-center {
    text-align: center;
  }

  .mtl-text-right {
    text-align: right;
  }
</style>
