<script lang="ts">
  import { Tree, OpenIcon, type TreeSlotSignature } from 'svelte-treeviews';
  import IndeterminateCheckbox from 'svelte-treeviews/IndeterminateCheckbox.svelte';

  import fluentModel from './fluentui2/data.json';
  import materialModel from './materialui/data.json';

  interface jsonRecord {
    text: string;
    icon?: string;
    children?: Array<jsonRecord>;
  }
</script>

<Tree
  model={materialModel as Array<jsonRecord>}
  defaultOpen={false}
  indent={20}
  treeLine={true}
  virtualization={true}
  class="mtl-tree"
  style="height: 500px">
  {#snippet tree_slot({ data, info }: TreeSlotSignature<jsonRecord>)}
    {#if info.children.length}
      <OpenIcon class="mlt-mr" onclick={() => info.toggleExpand()} bind:open={info.expended} />
    {/if}
    <IndeterminateCheckbox class="mtl-checkbox mtl-mr" bind:value={info.checked} />
    <span class="mtl-ml">{data.text}</span>
  {/snippet}
</Tree>

<h1>Fluent2</h1>

<Tree
  model={fluentModel as Array<jsonRecord>}
  defaultOpen={false}
  indent={10}
  treeLine={true}
  virtualization={true}
  class="fluentui2"
  style="height: 500px">
  {#snippet tree_slot({ data, info }: TreeSlotSignature<jsonRecord>)}
    {#if info.children.length}
      <OpenIcon onclick={() => info.toggleExpand()} bind:open={info.expended} />
    {/if}
    <span>{data.text}</span>
  {/snippet}
</Tree>

<style global>
  /* Fluent 2 styles */
  .fluentui2 .vtlist-inner div {
    position: relative;
    display: inline-flex;
    padding: 0.5rem;
    border-radius: 6px;
    background: #eceeef;
  }

  .fluentui2 .vtlist-inner div > * {
    margin-left: 0.25rem;
  }

  .fluentui2 .vtlist-inner div img,
  .fluentui2 .vtlist-inner div svg {
    width: 24px;
    height: 24px;
  }

  .fluentui2 .vtlist-inner div span {
    display: grid;
    place-items: center;
    color: #1e2225;
    font-weight: normal;
  }

  .fluentui2 .vtlist-inner .checked::after {
    position: absolute;
    top: calc(100% - 80%);
    left: 0;
    display: inline-block;
    content: ' ';
    width: 4px;
    height: calc(100% - 40%);
    background: #106ad9;
    border-radius: 6px;
  }

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

  .mtl-tree table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }

  .mtl-tree td,
  .mtl-tree th {
    border-bottom: 1px solid rgba(224, 224, 224, 1);
    line-height: 1.5;
  }

  .mtl-tree tr:last-child td,
  .mtl-tree tr:last-child tr {
    border-bottom: 0px;
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
