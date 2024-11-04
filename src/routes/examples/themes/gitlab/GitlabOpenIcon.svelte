<script lang="ts">
  let { open = $bindable(false), onclick = () => {} }: { open: boolean; onclick?: () => void } =
    $props();
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_consider_explicit_label -->
<span class="treeicon" class:open {onclick}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42Z" />
  </svg>
</span>

<style>
  .treeicon {
    position: absolute;
    right: 20px;
    vertical-align: middle;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    height: 19px;
    width: 19px;
  }

  .treeicon:hover {
    background-color: #d9d9d9;
  }

  .treeicon svg {
    transition: transform 0.3s ease-in-out;
    transform: rotate(0);
  }

  .treeicon.open svg {
    transform: rotate(90deg);
  }
</style>
