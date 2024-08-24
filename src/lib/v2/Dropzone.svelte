<script lang="ts">
  import { getContext } from 'svelte';

  //@ts-expect-error not typing
  const { getDragged } = getContext('dragging');

  let { prefix, ondrop }: { prefix: string; ondrop: Function } = $props();

  let draggingOver = $state(false);

  // TODO: force keep hierarchy, should be configurable
  function dragAllowed(eventTargetId) {
    return 1;
  }

  // Called when something is dragged over this node's dropzone.
  // If this drag action is allowed, the #draggingOver flag is set, in order to highlight the dropzone.
  function handleDragEnter(event) {
    if (!event.target || !event.target.id) return;
    if (dragAllowed(event.target.id) === 0) {
      return;
    }
    draggingOver = true;
  }

  // Called when something is dropped onto the dropzone.
  // Dispatches an event to notify the parent.
  function drop(event) {
    if (!event.target || !event.target.id) return;
    if (dragAllowed(event.target.id) > 0) {
      ondrop({
        oldPosition: getDragged(),
        newPosition: event.target.id.split('-')
      });
      // dispatch('drop', {
      //   oldPosition: getDragged(),
      //   newPosition: event.target.id.split('-')
      // });
    }
    cancelDrag();
  }

  function cancelDrag() {
    draggingOver = false;
  }

  function getId() {
    return `dropzone-${prefix}`;
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={`dropzone ${draggingOver ? 'active' : 'idle'}`}
  id={getId()}
  ondragleave={() => cancelDrag()}
  ondragenter={e => handleDragEnter(e)}
  ondrop={e => drop(e)}
  ondragover={() => false}>
</div>

<style>
  .dropzone.idle {
    height: 3px;
  }
  .dropzone.active {
    background-color: #d2d2d2;
    border: 1px dotted #6d6d6d;
    height: 24px;
  }
</style>
