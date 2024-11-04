<script lang="ts">
  let {
    open = $bindable(false),

    onclick = () => {}
  }: { open: boolean; onclick?: () => void } = $props();
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_consider_explicit_label -->
<a class="tvicon" class:open {onclick}>
  <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
    <path d="M12 5l0 14" />
    <path d="M5 12l14 0" />
  </svg>
</a>

<style>
  .tvicon {
    cursor: pointer;
    user-select: none;
    display: inline-block;
    vertical-align: middle;
    background-color: inherit;
    border-radius: 15px;
    margin: 0 6px;
    height: 16px;
    width: 16px;
    padding: 4px 4px;
  }

  .tvicon:hover {
    background-color: #e1e1e5;
  }

  .tvicon svg {
    transform: rotate(0);
    transition: transform 0.3s ease-in-out;
  }

  .tvicon.open svg {
    transform: rotate(90deg);
  }
</style>
