<script lang="ts">
  let { open = false }: { open: boolean } = $props();
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<a class="he-tree__open-icon" class:open>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42Z" />
  </svg>
</a>

<style>
  .he-tree__open-icon {
    cursor: pointer;
    user-select: none;
    display: inline-block;
  }

  .he-tree__open-icon.open {
    transform: rotate(90deg);
  }

  .he-tree__open-icon svg {
    width: 1em;
  }
</style>
