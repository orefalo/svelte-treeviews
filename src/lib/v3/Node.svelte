<script lang="ts">
  import { dndzone } from 'svelte-dnd-action';
  import { type NodeI, type NodeIArray, type NodeIDico } from './NodeI';

  let {
    node= $bindable(),
    ontoggle
  }: { node: NodeI; ontoggle?: Function } = $props();

  const toggleExpansion = () => {
    node.expanded = !node.expanded;
  };

  const toggleCheck = () => {
    // update the current node's state here, the UI only need to represent it,
    // don't need to bind the check state to the UI
    node.checked = !node.checked;

    // emit node 'toggle' event, notify parent compnent to rebuild the entire tree's state
    if (ontoggle) ontoggle({ node });
  };

  const flipDurationMs = 300;

  function handleDndConsider(e) {
    node.children = e.detail.items;
  }
  function handleDndFinalize(e) {
    node.children = e.detail.items;
    node = { ...node };
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
<ul>
  <li
    use:dndzone={{ items: node.children || [], flipDurationMs, centreDraggedOnCursor: true }}
    onconsider={handleDndConsider}
    onfinalize={handleDndFinalize}>
    {#if node.children}
      <input
        type="checkbox"
        data-label={node.label}
        checked={node.checked}
        indeterminate={node.indeterminate}
        onclick={toggleCheck} />
      <span onclick={toggleExpansion} class="arrow" class:arrowDown={node.expanded} />
      <span onclick={toggleCheck}>
        {node.label}
      </span>
      {#if node.expanded}
        {#each node.children as child}
          <div class="item">
            <svelte:self node={child} {ontoggle} />
          </div>
        {/each}
      {/if}
    {:else}
      <input
        type="checkbox"
        data-label={node.label}
        checked={node.checked}
        indeterminate={node.indeterminate}
        onclick={toggleCheck} />
      <span onclick={toggleCheck}>
        {node.label}
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
