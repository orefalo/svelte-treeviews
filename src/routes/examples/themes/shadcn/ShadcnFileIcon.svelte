<script lang="ts" generics="T">
  import folderopen from './openfolder.svg?raw';
  import folderclose from './closefolder.svg?raw';
  import file from './file.svg?raw';
  import type { NodeInfo } from 'svelte-treeviews/NodeInfo.svelte';

  let { node }: { node: NodeInfo<T> | undefined } = $props();

  // svelte-ignore non_reactive_update
  let svg = '';

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
</script>

<div class="logo">
  {@html svg}
</div>

<style>
  .logo {
    cursor: pointer;
    user-select: none;
    display: inline-block;
    vertical-align: middle;
    background-color: inherited;
    border-radius: 5px;
    margin: 0 6px;
    height: 24px;
    width: 24px;
  }
</style>
