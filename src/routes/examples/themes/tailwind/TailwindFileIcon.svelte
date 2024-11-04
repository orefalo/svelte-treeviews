<script lang="ts" generics="T">
  import folderopen from './openfolder.svg?raw';
  import folderclose from './closefolder.svg?raw';
  import file from './file.svg?raw';
  import type { NodeInfo } from 'svelte-treeviews/NodeInfo.svelte';

  let { node = $bindable() }: { node: NodeInfo<T> | undefined } = $props();

  let svg = $state('');

  const len = node?.children?.length || 0;
  if (len > 1) {
    if (node?.expended) {
      svg = folderopen;
    } else {
      svg = folderclose;
    }
  } else {
    svg = file;
  }

  function clicked() {
    if (node) node.expended = !node.expended;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span class="logo" onclick={clicked}>
  {@html svg}
</span>

<style>
  .logo {
    cursor: pointer;
    user-select: none;
    display: inline-block;
    vertical-align: middle;
    border-radius: 5px;
    margin: 0 6px;
    height: 16px;
    width: 16px;
    line-height: 22px;
  }
</style>
