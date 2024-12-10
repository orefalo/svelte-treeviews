<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { extendedDND } from '../dndutils';
  import * as hp from '../jshelper';
  import type { NodeInfo } from 'svelte-treeviews/NodeInfo.svelte';

  // Type definitions
  type PropDraggable = (stat: NodeInfo<any>) => boolean | null;
  type PropDroppable = (stat: NodeInfo<any>) => boolean | null;
  type RootDroppable = () => boolean;
  type BeforeDragOpen = (stat: NodeInfo<any>) => void | Promise<void>;
  type DragCopyDataHandler<T> = (nodeData: T) => T;
  type OnExternalDragOver = (event: DragEvent) => boolean;
  type ExternalDataHandler = (event: DragEvent) => any;

  // Props
  export let triggerClass: string | string[] = [];
  export let disableDrag = false;
  export let disableDrop = false;
  export let eachDraggable: PropDraggable | undefined = undefined;
  export let eachDroppable: PropDroppable | undefined = undefined;
  export let rootDroppable: boolean | RootDroppable = true;
  export let dragOpen = true;
  export let dragOpenDelay = 0;
  export let beforeDragOpen: BeforeDragOpen | undefined = undefined;
  export let resolveStartMovePoint:
    | 'mouse'
    | 'default'
    | ((dragElement: HTMLElement) => { x: number; y: number }) = 'default';
  export let keepPlaceholder = false;
  export let maxLevel: number | undefined = undefined;
  export let dragCopy = false;
  export let dragCopyDataHandler: DragCopyDataHandler<any> | undefined = undefined;
  export let onExternalDragOver: OnExternalDragOver | undefined = undefined;
  export let externalDataHandler: ExternalDataHandler | undefined = undefined;
  export let stats: NodeInfo<any>[] = [];
  export let childrenKey = 'children';

  const dispatch = createEventDispatcher();

  let rootEl: HTMLElement;
  let treeDraggableInstance: ReturnType<typeof extendedDND> | null = null;
  let dragNode: NodeInfo<any> | null = null;
  let startTree: any | null = null;
  let targetTree: any | null = null;
  let dragOpenLastNode: NodeInfo<any> | null = null;

  // Lifecycle management
  onMount(() => {
    treeDraggableInstance = extendedDND(rootEl, {
      beforeDragStart: event => {
        // Similar logic to Vue implementation for drag start
        // You'll need to adapt the Vue-specific logic to Svelte
      },
      onDragStart: event => {
        // Drag start logic
      },
      onEnter: event => {
        dispatch('enter', event);
      },
      onLeave: event => {
        dragOpenLastNode = null;
        dispatch('leave', event);
      },
      onDragOver: (event: DragEvent) => {
        // Drag over logic (very similar to Vue implementation)
      },
      onDrop: event => {
        // Drop logic
      },
      onDragEnd: event => {
        // Cleanup logic
      }
    });
  });

  onDestroy(() => {
    treeDraggableInstance?.destroy();
  });

  // Helper methods
  function isDraggable(node: NodeInfo<any>): boolean {
    if (disableDrag) return false;
    if (node.draggable != null) return node.draggable;
    if (eachDraggable) {
      const result = eachDraggable(node);
      if (result != null) return result;
    }
    return true;
  }

  function isDroppable(node: NodeInfo<any> | null): boolean {
    if (disableDrop) return false;
    if (!node) {
      return typeof rootDroppable === 'function' ? rootDroppable() : rootDroppable;
    }
    if (node.droppable != null) return node.droppable;
    if (eachDroppable) {
      const result = eachDroppable(node);
      if (result != null) return result;
    }
    return true;
  }
</script>

<div bind:this={rootEl} class="draggable-tree">
  <!-- Tree content would go here -->
  <slot />
</div>
