<script>
  import Tree from '$lib/v2/Tree.svelte';
  let { treeItems, options } = $props();

  let selected = $state();
  let newOrder;
</script>

<h1>Tree Example</h1>
(*) Custom labels do not display right away in the story book, tree items need to be toggled first.
<br />
However, they seem to work in a "normal" svelte app setup. I'm working on it :)
<hr />
<div class="flex-container">
  <div>
    <Tree
      {treeItems}
      {options}
      onselected={item => (selected = item.detail)}
      onmodelChanged={items => {
        treeItems = items.detail;
      }}></Tree>
  </div>
  <div>
    <h2>Current items:</h2>
    <pre>{JSON.stringify(treeItems, undefined, 2)}</pre>
  </div>
  <div>
    <h2>Selected item</h2>
    <pre>{JSON.stringify(selected, undefined, 2)}</pre>
  </div>
</div>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
</svelte:head>

<style>
  .flex-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
</style>
