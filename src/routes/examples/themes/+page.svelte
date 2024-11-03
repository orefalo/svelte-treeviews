<script lang="ts">
  import { Tree } from 'svelte-treeviews';
  import IndeterminateCheckbox from 'svelte-treeviews/IndeterminateCheckbox.svelte';

  import fluentModel from './fluentui2/data.json';
  import materialModel from './materialui/data.json';
  import gitlabModel from './gitlab/data.json';
  import shadcnModel from './shadcn/data.json';
  import tailwindModel from './tailwind/data.json';

  import MaterialOpenIcon from './materialui/MaterialOpenIcon.svelte';
  import FluentOpenIcon from './fluentui2/FluentOpenIcon.svelte';
  import GitlabOpenIcon from './gitlab/GitlabOpenIcon.svelte';
  import HeaderIcon from './gitlab/GitlabHeaderIcon.svelte';
  import ShadcnFileIcon from './shadcn/ShadcnFileIcon.svelte';
  import TailwindOpenIcon from './tailwind/TailwindOpenIcon.svelte';
  import TailwindFileIcon from './tailwind/TailwindFileIcon.svelte';

  interface jsonRecord {
    text: string;
    icon?: string;
    children?: Array<jsonRecord>;
  }
</script>

<h1>Material-Design</h1>

<Tree
  model={materialModel as Array<jsonRecord>}
  defaultOpen={false}
  indent={20}
  treeLineStyle="orthogonal"
  virtualization={true}
  class="mtl-tree"
  style="height: auto">
  {#snippet tree_slot({ data, info })}
    {#if info.children.length}
      <MaterialOpenIcon onclick={() => info.toggleExpand()} bind:open={info.expended} />
    {/if}
    <IndeterminateCheckbox class="mtl-checkbox mtl-mr" bind:value={info.checked} />
    <span>{data.text}</span>
  {/snippet}
</Tree>

<h1>FluentUI2</h1>

<Tree
  model={fluentModel as Array<jsonRecord>}
  defaultOpen={false}
  indent={10}
  treeLineStyle="none"
  virtualization={true}
  class="fluentui2"
  style="height: auto">
  {#snippet tree_slot({ data, info })}
    {#if info.children.length}
      <FluentOpenIcon onclick={() => info.toggleExpand()} bind:open={info.expended} />
      <span>{data.text}</span>
    {:else}
      <span style="padding-left:30px">{data.text}</span>
    {/if}
  {/snippet}
</Tree>

<h1>Gitlab</h1>

<Tree
  model={gitlabModel as Array<jsonRecord>}
  defaultOpen={false}
  indent={10}
  treeLineStyle="none"
  treeLineOffset={0}
  virtualization={true}
  class="gitlab"
  style="height: auto">
  {#snippet tree_slot({ data, info })}
    <HeaderIcon name={data.icon} />
    {#if info.children.length}
      <span>{data.text}</span>
      <GitlabOpenIcon onclick={() => info.toggleExpand()} bind:open={info.expended} />
    {:else}
      <span>{data.text}</span>
    {/if}
  {/snippet}
</Tree>

<h1>Shadcn</h1>

<Tree
  model={shadcnModel as Array<jsonRecord>}
  defaultOpen={false}
  indent={15}
  treeLineStyle="vertical"
  treeLineOffset={10}
  virtualization={true}
  class="shadcn"
  style="height: auto">
  {#snippet tree_slot({ data, info })}
    {#if info.children.length}
      <ShadcnFileIcon node={info} />
      <span>{data.text}</span>
    {:else}
      <span>{data.text}</span>
    {/if}
  {/snippet}
</Tree>

<h1>Tailwind</h1>

<Tree
  model={tailwindModel as Array<jsonRecord>}
  defaultOpen={false}
  indent={30}
  treeLineStyle="vertical"
  treeLineOffset={15}
  virtualization={true}
  class="tailwind"
  style="height: auto">
  {#snippet tree_slot({ data, info })}
    {#if info.children.length}
      <TailwindOpenIcon onclick={() => info.toggleExpand()} bind:open={info.expended} />
      <TailwindFileIcon node={info} />
      <span>{data.text}</span>
    {:else}
      <TailwindFileIcon node={info} />
      <span>{data.text}</span>
    {/if}
  {/snippet}
</Tree>

<style global>
  /****** METALUI ******/

  .mtl-tree .tree-node {
    padding: 1px 0;
  }

  .mtl-tree .tree-node:hover {
    background-color: #ededed;
  }

  .mtl-tree .tree-node-inner {
    display: flex;
    vertical-align: middle;
    align-items: center;
    font-size: 14px;
  }

  .mtl-checkbox {
    width: 14px;
    height: 14px;
  }

  .mtl-mr {
    margin-right: 4px;
  }

  /****** FLUENTUI STYLES ******/
  .fluentui2 .tree-node {
    padding: 0;
    background: #fafafa;
    height: 24px;
    display: flex;
    align-items: center;
  }

  .fluentui2 .tree-node:hover {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #ebebeb;
  }

  .fluentui2 .tree-node:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .fluentui2 .tree-node:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .fluentui2 .tree-node:before {
    position: absolute;
    top: 0;
    left: 0;
    order: -2;
    content: ' ';
    width: 4px;
    height: 20%;
    background: #106ad9;
    border-radius: 6px;
  }

  /****** GITLAB STYLES ******/
  .gitlab .tree-node {
    padding: 0;
    background: #fafafa;
    height: 30px;
    display: flex;
    align-items: center;
  }

  .gitlab .tree-node:hover {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #ebebeb;
  }

  .gitlab .tree-node:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .gitlab .tree-node:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .gitlab .tree-node:before {
    position: absolute;
    top: 0;
    left: 0;
    order: -2;
    content: ' ';
    width: 40px;
    height: 20%;
    background: #106ad9;
    border-radius: 6px;
  }

  /****** SHADCN STYLES ******/

  .shadcn .tree-node {
    padding: 0;
    background: #fafafb;
    height: 24px;
    display: flex;
    align-items: center;
  }

  .shadcn .tree-node:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .shadcn .tree-node:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .shadcn .tree-node:before {
    position: absolute;
    top: 0;
    left: 0;
    order: -2;
    content: ' ';
    width: 40px;
    height: 20%;
    background: #106ad9;
    border-radius: 6px;
  }

  /****** TAILWIND STYLES ******/

  .tailwind .tree-node {
    padding: 0;
    background: #fafafb;
    height: 24px;
    display: flex;
    align-items: center;
  }

  .tailwind .tree-node:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .tailwind .tree-node:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .tailwind .vt-tree-line {
    position: absolute;
    background-color: #9fa0a7;
  }

  .tailwind .vt-tree-vline {
    width: 2px;
    top: 0;
    bottom: 0;
  }

  .tailwind .vt-tree-hline {
    height: 2px;
    top: 50%;
    width: 10px;
  }
</style>
