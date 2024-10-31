<script lang="ts">
  import { Tree, OpenIcon } from 'svelte-treeviews';
  import IndeterminateCheckbox from 'svelte-treeviews/IndeterminateCheckbox.svelte';

  import FluentExpandCollapse from './fluentui2/FluentExpandCollapse.svelte';

  import fluentModel from './fluentui2/data.json';
  import materialModel from './materialui/data.json';
  import gitlabModel from './gitlab/data.json';

  interface jsonRecord {
    text: string;
    icon?: string;
    children?: Array<jsonRecord>;
  }
</script>

<h1>Material</h1>

<Tree
  model={materialModel as Array<jsonRecord>}
  defaultOpen={false}
  indent={20}
  treeLine={true}
  virtualization={true}
  class="mtl-tree"
  style="height: auto">
  {#snippet tree_slot({ data, info })}
    {#if info.children.length}
      <OpenIcon class="mlt-mr" onclick={() => info.toggleExpand()} bind:open={info.expended} />
    {/if}
    <IndeterminateCheckbox class="mtl-checkbox mtl-mr" bind:value={info.checked} />
    <span class="mtl-ml">{data.text}</span>
  {/snippet}
</Tree>

<FluentExpandCollapse open />

<h1>Fluent2</h1>

<Tree
  model={fluentModel as Array<jsonRecord>}
  defaultOpen={false}
  indent={10}
  treeLine={false}
  virtualization={true}
  class="fluentui2"
  style="height: auto">
  {#snippet tree_slot({ data, info })}
    {#if info.children.length}
      <FluentExpandCollapse onclick={() => info.toggleExpand()} bind:open={info.expended} />
      <span class="content">{data.text}</span>
    {:else}
      <span class="content" style="padding-left:30px">{data.text}</span>
    {/if}
  {/snippet}
</Tree>

<h1>Gitlab</h1>

<Tree
  model={gitlabModel as Array<jsonRecord>}
  defaultOpen={false}
  indent={0}
  treeLine={false}
  treeLineOffset={0}
  virtualization={true}
  class="gitlab"
  style="height: auto">
  {#snippet tree_slot({ data, info })}
    {#if info.children.length}
      <span class="content">{data.text}</span>
      <FluentExpandCollapse onclick={() => info.toggleExpand()} bind:open={info.expended} />
    {:else}
      <span class="content" style="padding-left:30px">{data.text}</span>
    {/if}
  {/snippet}
</Tree>

<h1>Shadcn</h1>

<h1>Tailwind</h1>

<style global>
  /* Fluent 2 styles */
  .fluentui2 .tree-node {
    position: relative;
    display: inline-block;
    padding: 0;
    background: #fafafa;
    height: 24px;
  }

  .fluentui2 .tree-node:hover {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    /* background-color: #ebebeb; */
    background-color: #0f0;
  }

  /* .fluentui2 .vtlist-inner div > * {
    margin-left: 0.25rem;

  } */

  /* This is to round the first item top corners */
  .fluentui2 .tree-node:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  /* This is to round the last item bottom corners */
  .fluentui2 .tree-node:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  /* .fluentui2 .tree-node img,
  .fluentui2 .tree-node svg {
    width: 24px;
    height: 24px;
  } */

  .fluentui2 .content {
    place-items: center;
    color: #1e2225;
    background-color: transparent;
    font-weight: normal;
  }

  .fluentui2 .checked::after {
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

  /* METALUI */

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

  /* GITLAB */
  .reticule {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .gitlab .tree-node {
    position: relative;
    display: inline-block;
    padding: 0;
    background: #fafafa;
    height: 24px;
  }

  .gitlab .tree-node:hover {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    /* background-color: #ebebeb; */
    background-color: #0f0;
  }

  /* This is to round the first item top corners */
  .gitlab .tree-node:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  /* This is to round the last item bottom corners */
  .gitlab .tree-node:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .gitlab .tree-node img,
  .gitlab .tree-node svg {
    width: 24px;
    height: 24px;
  }

  .gitlab .content {
    place-items: center;
    color: #1e2225;
    background-color: transparent;
    font-weight: normal;
  }

  .gitlab .checked::after {
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
</style>
