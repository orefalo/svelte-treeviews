<script lang="ts">
  import { getContext } from 'svelte';

  import Dropzone from './Dropzone.svelte';

  import DefaultLabelFormatter from './DefaultLabelFormatter.svelte';
  /////////////////////// EVENTS//////////////////////
  //const dispatch = createEventDispatcher();

  /////////////// CONTEXT DEPENDENCIES///////////////

  const { getDragged } = getContext('dragging');

  /////////////////////EXPORTED PROPERTIES///////////////////
  // Whether this folder is expanded or not (irrelevant for leaf nodes)
  let {
    expanded = false,
    // The entity's child elements. If not present, this is assumed to be a leaf node.
    children,
    // The label of this node
    label,
    // The prefix helps to find an element's position within the tree
    prefix = '',

    internalOptions,

    onselected,
    ondragstart,
    ondrop
  }: {
    expanded: boolean;
    label: string;
    prefix: string;
    onselected: Function;
    ondragstart: Function;
    ondrop: Function;
  } = $props();

  // (Optional)
  // export let collapseClass;
  // export let expandClass;
  // (Optional)
  // export let labelFormatter;
  // (Optional) data. This can be whatever you want, for example to identifier the node afterwards
  // export let data = null;

  //////////////////// OTHER MEMBERS/////////////////////////
  // Set to true when this folder's dropzone is currently dragged over
  let draggingOver = false;

  let isLeafNode = $derived(!Array.isArray(children));
  let isRootNode = $derived(prefix === null);

  //////////////////FUNCTIONS//////////////////////////
  // Called when this folder is shown/collapsed
  function toggle() {
    expanded = !expanded;
  }

  // Called when this Node has been selected. Dispatches an event to the parent component
  function select() {
    onselected?.(`${prefix}`.split('-'));
    // dispatch('selected', `${prefix}`.split('-'));
  }

  // Resets #draggingOVer flag in order to remove highlighting of dropzone
  function cancelDrag() {
    draggingOver = false;
  }

  // Called when the user starts to drag something.
  // Dispatches an event to notfify the parent who needs to update the context value (see #getDragged).
  function dragStart(event) {
    if (!event.target || !event.target.id) return;
    ondragstart?.(event.target.id.split('-'));
    // dispatch('dragstart', event.target.id.split('-'));
  }

  function getPrefix(index) {
    if (prefix !== null) {
      return `${prefix}-${index}`;
    }
    return index;
  }
</script>

<!-- DROPZONE -->
{#if !isRootNode}
  <Dropzone {ondrop} {prefix} />
{/if}

<!-- DISPLAY ELEMENT -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div draggable="true" ondragstart={e => dragStart(e)} ondragend={cancelDrag} id={prefix}>
  {#if !isLeafNode}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <i
      class={`clickable toggle-icon ${expanded ? internalOptions.collapseClass : internalOptions.expandClass}`}
      onclick={toggle}>
    </i>
  {/if}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="node-wrapper" onclick={select}>
    <DefaultLabelFormatter {label} {isLeafNode} />
  </div>
</div>

<!-- CHILDREN  -->
{#if expanded && !isLeafNode}
  <ul>
    {#each children as child, i}
      <li>
        <svelte:self
          {...child}
          {internalOptions}
          {expanded}
          prefix={getPrefix(i)}
          {onselected}
          ondragenter
          ondragleave
          {ondragstart}
          ondragend
          {ondrop} />
      </li>
    {/each}
    <li>
      <Dropzone {ondrop} prefix={getPrefix(children?.length)} />
    </li>
  </ul>
{/if}

<style>
  .chevron::before {
    border-style: solid;
    border-width: 0.25em 0.25em 0 0;
    content: '';
    display: inline-block;
    height: 0.45em;
    left: 0.15em;
    position: relative;
    top: 0.15em;
    transform: rotate(-45deg);
    vertical-align: top;
    width: 0.45em;
  }
  .chevron.right:before {
    left: 0;
    transform: rotate(45deg);
  }
  .chevron.bottom:before {
    top: 0;
    transform: rotate(135deg);
  }
  .clickable {
    cursor: pointer;
  }
  ul {
    padding: 0.2em 0 0 0.5em;
    margin: 0 0 0 0.5em;
    list-style: none;
  }
  li {
    padding: 0.2em 0;
  }
  .node-wrapper {
    display: inline-block;
  }
  .toggle-icon {
    padding-right: 0.5em;
  }
  .placeholder {
    width: 1.5em;
  }
</style>
