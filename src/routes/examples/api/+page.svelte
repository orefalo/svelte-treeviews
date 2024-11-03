<script lang="ts">
  import { Tree } from 'svelte-treeviews';

  // svelte-ignore non_reactive_update
  let tree;

  interface TreeNode {
    text: string;
    children?: Array<TreeNode>;
  }

  const treeData: Array<TreeNode> = $state([
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
    tree.add({ text: 'new node' }, tree.rootChildren()[0], tree.rootChildren()[0].children.length);
  }
  function addAfterSecondNode() {
    tree.add({ text: 'new node' }, null, 2);
  }
  function addNestedNewNodes() {
    tree.add({ text: 'new parent', children: [{ text: 'new child' }] }, null, 2);
  }
  function addMulti() {
    // nested new nodes supported
    tree.addMulti([{ text: 'addMulti1' }, { text: 'addMulti2' }], tree.rootChildren()[1], 0);
  }
  function batchUpdate() {
    tree.batchUpdate(() => {
      addAppendToFirstNode();
      addMulti();
    });
  }
  function getChecked(withIndeterminate) {
    console.log(tree.getChecked(withIndeterminate));
    notify();
  }
  function getDataAll() {
    console.log(tree.getData());
    notify();
  }

  function getDataFirstNode() {
    console.log(tree.getData(null, tree.rootChildren()[0]));
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
    virtualization={true}
    style="height: 500px">
    {#snippet tree_slot({ data, info })}
      {#if info.children.length}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <span onclick={() => info.toggleExpand()}>{info.expended ? '-' : '+'}</span>
      {/if}
      <input type="checkbox" value={info.checked} onclick={() => info.toggleChecked()} />
      {data.text}
    {/snippet}
  </Tree>

  <hr />
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
    <button
      onclick={() => tree.openNodeAndParents(treeData[0].children[0].children[1].children[0])}>
      openNodeAndParents
    </button>
    <button onclick={getChecked}>getChecked</button>
    <button onclick={() => getChecked(true)}>getChecked(true)</button>
    <br />
    <button onclick={getDataAll}>getData: all</button>
    <button onclick={getDataFirstNode}>getData: first node</button>
    <select name="my_select">
      <option value="none">None</option>
      <option value="single">Single</option>
      <option value="multiple">Multiple</option>
    </select>
    <input value="Filter" />
  </div>
</div>
