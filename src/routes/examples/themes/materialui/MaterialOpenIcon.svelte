<script lang="ts">
  let { open = $bindable(false), onclick = () => {} }: { open: boolean; onclick?: () => void } =
    $props();
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_consider_explicit_label -->
<a class="tvicon" class:open {onclick}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42Z" />
  </svg>
</a>

<style>
  .tvicon {
    cursor: pointer;
    user-select: none;
    display: inline-block;
    transform: rotate(0);
    transition: transform 0.3s ease-in-out;
  }

  .tvicon.open {
    transform: rotate(90deg);
  }

  .tvicon svg {
    width: 1em;
  }
</style>
