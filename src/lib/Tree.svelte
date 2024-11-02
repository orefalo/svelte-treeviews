<script lang="ts" generics="T extends any">
  import { VirtualList, type VLSlotSignature } from 'svelte-virtuallists';
  import TreeNode from './TreeNode.svelte';
  import { TreeProcessor } from './TreeProcessor.svelte';
  import { createTreeProcessor } from './TreeProcessorFactory';
  import type { NodeInfo } from './NodeInfo.svelte';
  import type { Snippet } from 'svelte';
  import * as hp from './jshelper';
  import clsx from 'clsx';

  import { CHILDREN } from '$lib/Constants';

  let {
    // the model is only used as an interface with the component, model -> valueComputer -> nodeInfos -> computedTree
    // vuejs: used to be called computedValue - which translated into either value or modelValue
    model,

    // specifies how onUpdateValue() is triggered
    updateBehavior = 'modify',
    // json.key is used for sub nodes
    childrenKey = CHILDREN,
    // json.key used for leaf nodes
    // textKey = 'text',
    // // Use index when rendering node's indexes or return a unique value.
    // nodeKey = 'index',
    // node indent in px
    indent = $bindable(20),
    // Enable virtual list
    //TODO:rename this to enableScrollbar
    virtualization = $bindable(false),
    //  The number of rendered list items at initialization. Suits for SSR(Server Side Render).
    virtualizationPrerenderCount = 20,
    // Open all nodes by default.
    defaultOpen = $bindable(true),
    // Display from right to left.
    rtl = $bindable(false),
    // Display bottom to top
    btt = $bindable(false),
    // Display tree line.
    treeLine = $bindable(false),
    // Horizontal displacement of tree lines, unit: pixels.
    treeLineOffset = 8,
    // css class for the tree
    class: className = '',
    // styles for the tree
    style = '',

    selectionBehavior = 'single',

    processor = createTreeProcessor<T>([], {
      // do not call init(), will be called manually later
      noInitialization: true,
      defaultOpen: defaultOpen
    }),
    // used to apply changes to the nodeInfo prior to processor()
    // vuejs: used to be called statHandler
    nodeInfoPreProcessor,

    // SLOTS

    // to customize the rendering of treenodes
    tree_slot,
    // to customize the rendering of the drag/drop area
    placeholder,

    // EVENTS

    // Triggered when a node is checked
    onSelectionChanged,
    // Triggered when a node is selected
    // onNodeSelected,
    // Triggered when a grouping node is opened
    onNodeOpened,
    // Triggered when a grouping node is closed
    onNodeClosed,
    // Triggered when node value changes, or batch update completed - behavioe depends up updateBehavior
    onUpdateValue
  }: {
    model: Array<T>;
    processor?: TreeProcessor<T>;
    updateBehavior?: 'modify' | 'new' | 'disabled';
    childrenKey?: string;
    // textKey?: string;
    // nodeKey?: string | ((info: NodeInfo<T>, index: number) => any);
    indent?: number;
    virtualization?: boolean;
    virtualizationPrerenderCount?: number;
    defaultOpen?: boolean;
    rtl?: boolean;
    btt?: boolean;

    treeLine?: boolean;
    treeLineOffset?: number;
    class?: string;
    style?: string;

    selectionBehavior?: 'none' | 'single' | 'multiple';

    // handler
    nodeInfoPreProcessor?: (info: NodeInfo<T>) => NodeInfo<T>;

    // slots
    tree_slot: Snippet<[{ data: T; info: NodeInfo<T> }]>;
    placeholder?: Snippet;

    // events
    onSelectionChanged?: (e: NodeInfo<T>) => void;
    // onNodeSelected?: (e: NodeInfo<T>) => void;
    onNodeOpened?: (e: NodeInfo<T>) => void;
    onNodeClosed?: (e: NodeInfo<T>) => void;
    onUpdateValue?: (e: NodeInfo<T> | NodeInfo<T>[]) => void;
  } = $props();

  const getNodeDataChildren = (nodeData: any): any[] => {
    if (!nodeData) {
      return valueComputed;
    } else {
      if (!nodeData[childrenKey]) {
        nodeData[childrenKey] = [];
      }
      return nodeData[childrenKey];
    }
  };

  processor.afterSetInfoNode = (info, parent, index) => {
    let value = valueComputed;
    if (updateBehavior === 'new') {
      if (batchUpdateWaiting) {
        return;
      }
      value = getData();
    } else if (updateBehavior === 'modify') {
      const siblings = getNodeDataChildren(parent?.data);
      if (siblings.includes(info.data)) {
        // when call add -> add child -> _setPositionm ignore because the child already in parent.children
      } else {
        siblings.splice(index, 0, info.data);
      }
    } else if (updateBehavior === 'disabled') {
    }

    if (batchUpdateWaiting) {
      return;
    }
    _updateValue(value);
  };

  processor.afterRemoveInfoNode = info => {
    let value = valueComputed;
    if (updateBehavior === 'new') {
      if (batchUpdateWaiting) {
        return;
      }
      value = getData();
    } else if (updateBehavior === 'modify') {
      const siblings = getNodeDataChildren(info.parent?.data);
      hp.arrayRemove(siblings, info.data);
    } else if (updateBehavior === 'disabled') {
    }
    if (batchUpdateWaiting) {
      return;
    }
    _updateValue(value);
  };

  let rootElement;

  // this is the model of the tree, it holds meta-data and data
  // TODO: rename to
  // vuejs: used to be called rootChildren
  let treeRoot: Array<NodeInfo<T>> = $state([]);

  // used to render the virtual list
  // vuejs: used to be called statsFlat
  let computedTree: Array<NodeInfo<T>> = $state([]);

  // node being dragged
  let dragNode: NodeInfo<T> | null = null;
  let dragOvering: boolean = false;
  let placeholderData: {} = {};
  let batchUpdateWaiting: boolean = false;

  let _ignoreValueChangeOnce: boolean = false;

  let valueComputed = $derived.by(() => {
    // TODO: I am a bit confused why this code works in $effect and not a $derived
    // console.log('model change detected');

    // // TODO: change this? isDragging triggered in Vue2 because its array is not same with Vue3
    // const isDragging = dragOvering || dragNode;
    // if (isDragging || _ignoreValueChangeOnce) {
    //   _ignoreValueChangeOnce = false;
    // } else {
    //   console.log('Initializing model');
    //   processor.nodeData = model;
    //   processor.init();

    //   // what about     nodeInfosToRender=processor.init(model)

    //   nodeInfos = processor.nodeInfos!;
    //   computedTree = processor.nodeInfosToRender!;
    // }
    return model;
  });

  $effect(() => {
    // TODO: I am a bit confused why this code works in $effect and not a $derived

    // TODO: change this? isDragging triggered in Vue2 because its array is not same with Vue3
    const isDragging = dragOvering || dragNode;
    if (isDragging || _ignoreValueChangeOnce) {
      _ignoreValueChangeOnce = false;
    } else {
      processor.rawData = model;
      //TODO: refactor to nodeInfosToRender=processor.init(model)
      processor.init();

      treeRoot = processor.nodeInfos!;
      computedTree = processor.nodeInfosToRender!;
    }
  });

  const selection: Array<NodeInfo<T>> = [];

  let lockOut = false;

  // called when one of the node is checked/unchecked
  function nodeSelectionChanged(node: NodeInfo<T>) {
    // if (!lockOut) {
    //   console.log('nodeSelectionChanged');
    //   if (selectionBehavior === 'single') {
    //     if (selection.length > 0) {
    //       if (selection[0] !== node) {
    //         lockOut = true;
    //         selection[0].checked = false;
    //         selection[0] = node;
    //         node.checked = true;
    //       }
    //     } else {
    //       lockOut = true;
    //       selection.push(node);
    //       node.checked = true;
    //     }
    //   } else if (selectionBehavior === 'multiple') {
    //   }
    //   lockOut = false;
    // }
  }

  // only returns the visible nodes
  // vuejs: use to be visibleStats
  function filterVisibleNodes(): NodeInfo<T>[] {
    let items = computedTree;
    if (btt) {
      items = items.slice().reverse();
    }
    return items.filter(info => isVisible(info));
  }

  // returns the top level nodeInfo
  // vuejs used to be called rootChildren
  export function rootChildren(): NodeInfo<T>[] {
    return treeRoot;
  }

  function _emitValue(value: any[]) {
    if (onUpdateValue) onUpdateValue(value);
  }
  /**
   * private method
   * @param value
   */
  function _updateValue(value: any[]) {
    if (updateBehavior === 'disabled') {
      return false;
    }

    // if value changed, ignore change once
    if (value !== valueComputed) {
      _ignoreValueChangeOnce = true;
    }
    _emitValue(value);
    return true;
  }

  // Get nodeinfo for given node data.
  export function getNodeInfo(nodeData: T): NodeInfo<T> {
    return processor.getNodeInfo(nodeData);
  }

  // Detect the tree if has given node data.
  export function has(nodeInfoOrNodeData: NodeInfo<T> | T): boolean {
    return processor.has(nodeInfoOrNodeData);
  }

  // Recalculate checked state of all nodes from end to root
  function updateCheckboxes(): void {
    processor.updateCheckboxes();
  }

  // Get all checked nodes. Param withIndeterminate means including half checked
  export function getChecked(withIndeterminate?: boolean): NodeInfo<T>[] {
    return processor.getChecked(withIndeterminate);
  }

  // Get all unchecked nodes. Param withIndeterminate means including half checked.
  export function getUnchecked(withIndeterminate?: boolean): NodeInfo<T>[] {
    return processor.getUnchecked(withIndeterminate);
  }

  // Open all nodes
  export function openAll(): void {
    console.log('openAll');
    processor.openAll();
  }

  // Open a node and its all parents to make it visible. The argument nodeDataOrStat can be node data or node stat
  export function openNodeAndParents(nodeInfoOrNodeData: NodeInfo<T> | T): void {
    processor.openNodeAndParents(nodeInfoOrNodeData);
  }

  // Close all nodes
  export function closeAll(): void {
    console.log('closeAll');
    processor.closeAll();
  }

  // Detect if node is visible. When parent invisible or closed, children are invisible. Param statOrNodeData can be node data or stat.
  export function isVisible(NodeInfoOrNodeData: NodeInfo<T> | T): boolean {
    return processor.isVisible(NodeInfoOrNodeData);
  }

  // Move node. parent is null means root. Similar to add
  export function move(info: NodeInfo<T>, parent: NodeInfo<T> | undefined, index: number) {
    return processor.move(info, parent, index);
  }

  // Add node. parent is null means root.
  export function add(data: T, parent: NodeInfo<T> | undefined, index?: number): void {
    return processor.add(data, parent, index);
  }

  // return the component's top level htmlelement
  // function getRootEl() {
  //   return rootElement as HTMLElement;
  // }

  // Add multiple continuously nodes. parent is null means root.
  export function addMulti(dataArr: T[], parent?: NodeInfo<T>, startIndex?: number) {
    batchUpdate(() => {
      let index = startIndex;
      for (const data of dataArr) {
        add(data, parent, index);
        if (index != null) {
          index++;
        }
      }
    });
  }

  // Remove node
  export function remove(info: NodeInfo<T>): boolean {
    return processor.remove(info);
  }

  // Remove multiple nodes.
  export function removeMulti(dataArr: T[]) {
    const cloned = [...dataArr];
    batchUpdate(() => {
      for (const data of cloned) {
        remove(getNodeInfo(data));
      }
    });
  }

  // Iterate all parents of a node. Param opt.withSelf means including it self
  // ie. for (const parentStat of tree.iterateParent(nodeStat, { withSelf: false })) { ... }
  export function iterateParent(info: NodeInfo<T>, opt?: { withSelf: boolean }) {
    return processor.iterateParent(info, opt);
  }

  // Get all siblings of a node including itself.
  export function getSiblings(info: NodeInfo<T>): NodeInfo<T>[] {
    return processor.getSiblings(info);
  }

  // Generate and get current data without stat. Param filter can handle each node data
  export function getData(filter?: (data: T) => any, root?: NodeInfo<T>): T[] {
    return processor.getData(filter, root) as T[];
  }

  // Merge multiple data update actions, to make it only emit new data once
  export function batchUpdate(task: () => any | Promise<any>) {
    const r = _ignoreUpdate(task);
    if (!batchUpdateWaiting) {
      _updateValue(updateBehavior === 'new' ? getData() : valueComputed);
    }
    return r;
  }

  function _ignoreUpdate(task: () => any | Promise<any>) {
    const old = batchUpdateWaiting;
    batchUpdateWaiting = true;
    const r = task();
    batchUpdateWaiting = old;
    return r;
  }
</script>

<VirtualList
  bind:this={rootElement}
  class={clsx(
    'he-tree',
    className,
    rtl && 'he-tree--rtl rtl',
    dragOvering && 'he-tree--drag-overing drag-overing'
  )}
  {style}
  preRenderCount={virtualizationPrerenderCount}
  isDisabled={!virtualization}
  items={filterVisibleNodes()}>
  {#snippet vl_slot({ item: nodeInfo }: VLSlotSignature<NodeInfo<T>>)}
    {#if nodeInfo}
      <TreeNode
        class={clsx(nodeInfo.class, {
          'drag-placeholder-wrapper': nodeInfo.data === placeholderData,
          'dragging-node': nodeInfo === dragNode
        })}
        style={nodeInfo.style}
        {nodeInfo}
        bind:rtl
        bind:btt
        bind:indent
        bind:treeLine
        bind:treeLineOffset
        {processor}
        {onNodeOpened}
        {onNodeClosed}
        onNodeChecked={nodeSelectionChanged}>
        {#snippet tn_slot(params)}
          {#if params.data === placeholderData}
            <div class="drag-placeholder he-tree-drag-placeholder">
              {@render placeholder?.()}
            </div>
          {:else}
            {@render tree_slot(params)}
          {/if}
        {/snippet}
      </TreeNode>
    {/if}
  {/snippet}
</VirtualList>

<style global>
  .he-tree--rtl {
    direction: rtl;
  }

  .drag-placeholder {
    background: #ddf2f9;
    border: 1px dashed #00d9ff;
    height: 22px;
    width: 100%;
  }

  .he-tree-drag-placeholder {
    background: #ddf2f9;
    border: 1px dashed #00d9ff;
    height: 22px;
    width: 100%;
  }
</style>
