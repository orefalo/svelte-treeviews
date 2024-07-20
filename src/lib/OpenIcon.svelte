<script lang="ts">
  let {
    open = false,
    class: className = '',
    onclick = () => {}
  }: { open: boolean; class?: string; onclick?: () => void } = $props();
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<a class={`treeicon ${className}`} class:open {onclick}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42Z" />
  </svg>
</a>

<style>
  .treeicon {
    cursor: pointer;
    user-select: none;
    display: inline-block;
  }

  .treeicon.open {
    transform: rotate(90deg);
  }

  .treeicon svg {
    width: 1em;
  }
</style>
