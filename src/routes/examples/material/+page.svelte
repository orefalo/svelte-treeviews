<script lang="ts">
  import { Tree, OpenIcon } from 'svelte-treeviews';
  import IndeterminateCheckbox from 'svelte-treeviews/IndeterminateCheckbox.svelte';

  import { NodeInfo } from 'svelte-treeviews/NodeInfo.svelte';

  const treeModel = [
    {
      text: 'Projects',
      children: [
        {
          text: 'Frontend',
          children: [
            {
              text: 'Vue',
              children: [
                {
                  text: 'Nuxt'
                }
              ]
            },
            {
              text: 'React',
              children: [
                {
                  text: 'Next'
                }
              ]
            },
            {
              text: 'Angular'
            }
          ]
        },
        {
          text: 'Backend'
        }
      ]
    },
    { text: 'Photos' },
    { text: 'Videos' }
  ];
</script>

<Tree
  model={treeModel}
  defaultOpen={true}
  indent={20}
  treeLine={true}
  virtualization={true}
  class="mtl-tree"
  style="height: 500px">
  {#snippet tree_slot({ data, info }: { data: any; info: NodeInfo })}
    {#if info.children.length}
      <OpenIcon class="mlt-mr" onclick={() => info.toggleExpand()} bind:open={info.expended} />
    {/if}
    <IndeterminateCheckbox class="mtl-checkbox mtl-mr" bind:value={info.checked} />
    <span class="mtl-ml">{data.text}</span>
  {/snippet}
</Tree>

<style global>
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
