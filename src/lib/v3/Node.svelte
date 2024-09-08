<script lang="ts">
  import { type NodeI } from './NodeI';

  let { tree = $bindable(), ontoggle }: { tree: NodeI; ontoggle?: Function } = $props();

  const toggleExpansion = () => {
    tree.expanded = !tree.expanded;
  };

  const toggleCheck = () => {
    // update the current node's state here, the UI only need to represent it,
    // don't need to bind the check state to the UI
    tree.checked = !tree.checked;

    // emit node 'toggle' event, notify parent component to rebuild the entire tree's state
    if (ontoggle)
      ontoggle(tree);
  };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
<ul>
  <li>
    {#if tree.children}
      <input
        type="checkbox"
        data-label={tree.label}
        checked={tree.checked}
        indeterminate={tree.indeterminate}
        onclick={toggleCheck} />
      <span onclick={toggleExpansion} class="arrow" class:arrowDown={tree.expanded} />
      <span onclick={toggleCheck}>
        {tree.label}
      </span>
      {#if tree.expanded}
        {#each tree.children as child}
          <div class="item">
            <svelte:self tree={child} {ontoggle} />
          </div>
        {/each}
      {/if}
    {:else}
      <input
        type="checkbox"
        data-label={tree.label}
        checked={tree.checked}
        indeterminate={tree.indeterminate}
        onclick={toggleCheck} />
      <span onclick={toggleCheck}>
        {tree.label}
      </span>
    {/if}
  </li>
</ul>

<style>
  ul {
    margin: 0;
    list-style: none;
    padding-left: 1.2rem;
    user-select: none;
  }
  .arrow::before {
    --tw-content: '+';
    content: var(--tw-content);
    display: inline-block;
    cursor: pointer;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    font-size: 1rem;
    line-height: 1.5rem;
  }
  .arrowDown::before {
    --tw-content: '-';
    content: var(--tw-content);
  }
</style>
