<script lang="ts">
  let {
    open = $bindable(false),
    bgColor = 'inherited',
    // hoverColor = '#D9D9D9',
    hoverColor = '#f00',
    onclick = () => {
      open = !open;
    }
  }: {
    open: boolean;
    bgColor?: string;
    hoverColor?: string;
    onclick?: () => void;
  } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  style="--theme-bgcolor: {bgColor};--theme-hovercolor: {hoverColor}"
  class="toggleBtn"
  class:open
  {onclick}>
  <span>
    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.65 2.15a.5.5 0 000 .7L7.79 6 4.65 9.15a.5.5 0 10.7.7l3.5-3.5a.5.5 0 000-.7l-3.5-3.5a.5.5 0 00-.7 0z">
      </path>
    </svg>
  </span>
</div>

<style>
  .toggleBtn {
    width: 24px;
    height: 24px;
    margin: 0 6px;
    display: inline-block;
    padding: 0;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;
    background-color: var(--theme-bgcolor);
    user-select: none;
  }

  .toggleBtn:hover {
    background-color: var(--theme-hovercolor);
  }

  .toggleBtn span {
    margin: 0 5px;
    /* display: inline-block; */
    transition: transform 0.3s ease-in-out;
  }

  .toggleBtn span {
    transform: rotate(0);
  }

  .toggleBtn.open span {
    transform: rotate(90deg);
  }
</style>
