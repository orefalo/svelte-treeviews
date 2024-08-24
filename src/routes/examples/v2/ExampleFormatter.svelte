<script>
  let { label, isLeafNode } = $props();
</script>

{#if isLeafNode}
  <span class="leafNode clickable">{label}</span>
{:else}
  <span class="folderNode clickable">{label}</span>
{/if}

<style>
  .leafNode {
    font-style: italic;
  }
  .folderNode {
    text-transform: uppercase;
  }
  .clickable {
    cursor: pointer;
  }
</style>
