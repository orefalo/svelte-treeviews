<script lang="ts">
  import { Tree } from 'svelte-treeviews';

  import { NodeInfo } from 'svelte-treeviews/NodeInfo.svelte';

  // svelte-ignore non_reactive_update
  let tree;

  const treeData = $state([
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
  ]);
  const defaultOpen = $state(true);
  const rtl = $state(false);
  const indent = $state(20);
  const btt = $state(false);
  const treeLine = $state(true);

  function notify() {
    alert(`Outputed to browser console, please check`);
  }

  function addAppendToFirstNode() {
    tree.add({ text: 'new node' }, tree.rootChildren[0], tree.rootChildren[0].children.length);
  }
  function addAfterSecondNode() {
    tree.add({ text: 'new node' }, null, 2);
  }
  function addNestedNewNodes() {
    tree.add({ text: 'new parent', children: [{ text: 'new child' }] }, null, 2);
  }
  function addMulti() {
    // nested new nodes supported
    tree.addMulti([{ text: 'addMulti1' }, { text: 'addMulti2' }], tree.rootChildren[1], 0);
  }
  function batchUpdate() {
    tree.batchUpdate(() => {
      addAppendToFirstNode();
      addMulti();
    });
  }
  function getChecked(withDemi) {
    console.log(tree.getChecked(withDemi));
    notify();
  }
  function getDataAll() {
    console.log(tree.getData());
    notify();
  }

  function getDataFirstNode() {
    console.log(tree.getData(null, tree.rootChildren[0]));
    notify();
  }
</script>

<div>
  <Tree
    bind:this={tree}
    model={treeData}
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

  <hr/>
  <div class="actions">
    <button onclick={addAppendToFirstNode}>add: append to first node</button>
    <button onclick={addAfterSecondNode}>add: after second node</button>
    <button onclick={addNestedNewNodes}>add: nested new nodes</button>
    <button onclick={addMulti}>addMulti</button>
    <br />
    <button onclick={batchUpdate}>batchUpdate</button>
    <br />
    <button onclick={tree.closeAll}>closeAll</button>
    <button onclick={tree.openAll}>openAll</button>
    <button onclick={tree.openNodeAndParents(treeData[0].children[0].children[1].children[0])}>
      openNodeAndParents
    </button>
    <button onclick={getChecked}>getChecked</button>
    <button onclick={() => getChecked(true)}>getChecked(true)</button>
    <br />
    <button onclick={getDataAll}>getData: all</button>
    <button onclick={getDataFirstNode}>getData: first node</button>
  </div>
</div>

<!--
<template>
    <div>
      <Draggable ref="tree" class="mtl-tree" v-model="treeData" treeLine
        ><template #default="{ node, stat }">
          <OpenIcon
            v-if="stat.children.length"
            :open="stat.open"
            class="mtl-mr"
            @click.native="stat.open = !stat.open"
          />
          <input
            class="mtl-checkbox mtl-mr"
            type="checkbox"
            v-model="stat.checked"
          />
          <span class="mtl-ml">{{ node.text }}</span>
        </template></Draggable
      >
      <div class="actions">
        <button @click="addAppendToFirstNode()">add: append to first node</button>
        <button @click="addAfterSecondNode()">add: after second node</button>
        <button @click="addNestedNewNodes()">add: nested new nodes</button>
        <button @click="addMulti()">addMulti</button>
        <br />
        <button @click="batchUpdate()">batchUpdate</button>
        <br />
        <button @click="$refs.tree.closeAll()">closeAll</button>
        <button @click="$refs.tree.openAll()">openAll</button>
        <button
          @click="
            $refs.tree.openNodeAndParents(
              treeData[0].children[0].children[1].children[0]
            )
          "
        >
          openNodeAndParents
        </button>
        <button @click="getChecked()">getChecked</button>
        <button @click="getChecked(true)">getChecked(true)</button>
        <br />
        <button @click="getDataAll()">getData: all</button>
        <button @click="getDataFirstNode()">getData: first node</button>
      </div>
    </div>
  </template>
  
  <script>
    import { BaseTree, Draggable, pro, OpenIcon } from '@he-tree/vue'
    import '@he-tree/vue/style/default.css'
    import '@he-tree/vue/style/material-design.css'
  
    export default {
      components: { Draggable, OpenIcon },
      data() {
        return {
          treeData: [
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
                          text: 'Nuxt',
                        },
                      ],
                    },
                    {
                      text: 'React',
                      children: [
                        {
                          text: 'Next',
                        },
                      ],
                    },
                    {
                      text: 'Angular',
                    },
                  ],
                },
                {
                  text: 'Backend',
                },
              ],
            },
            { text: 'Photos' },
            { text: 'Videos' },
          ],
        }
      },
      methods: {
        notify() {
          alert(`Outputed to browser console, please check`)
        },
        addAppendToFirstNode() {
          this.$refs.tree.add(
            { text: 'new node' },
            this.$refs.tree.rootChildren[0],
            this.$refs.tree.rootChildren[0].children.length
          )
        },
        addAfterSecondNode() {
          this.$refs.tree.add({ text: 'new node' }, null, 2)
        },
        addNestedNewNodes() {
          this.$refs.tree.add(
            { text: 'new parent', children: [{ text: 'new child' }] },
            null,
            2
          )
        },
        addMulti() {
          // nested new nodes supported
          this.$refs.tree.addMulti(
            [{ text: 'addMulti1' }, { text: 'addMulti2' }],
            this.$refs.tree.rootChildren[1],
            0
          )
        },
        batchUpdate() {
          this.$refs.tree.batchUpdate(() => {
            this.addAppendToFirstNode()
            this.addMulti()
          })
        },
        getChecked(withDemi) {
          console.log(this.$refs.tree.getChecked(withDemi))
          this.notify()
        },
        getDataAll() {
          console.log(this.$refs.tree.getData())
          this.notify()
        },
        getDataFirstNode() {
          console.log(
            this.$refs.tree.getData(null, this.$refs.tree.rootChildren[0])
          )
          this.notify()
        },
      },
    }
  </script>
  <style scoped>
    .actions {
      margin-top: 10px;
      border-top: 1px solid #ccc;
      padding-top: 10px;
    }
    button {
      border: 1px solid #ccc;
      padding: 2px 5px;
      border-radius: 5px;
      margin-right: 8px;
      margin-bottom: 5px;
      font-size: small;
    }
  </style>
-->
