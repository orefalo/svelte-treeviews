<script lang="ts">
  import { VirtualList, type VLSlotSignature } from 'svelte-virtuallists';
  import TreeNode from './TreeNode.svelte';
  import { TreeProcessor } from './TreeProcessor.svelte';
  import { createTreeProcessor } from './TreeProcessorFactory';
  import type { NodeData, NodeInfo } from './NodeInfo.svelte';
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
    textKey = 'text',
    // Use index when rendering node's indexes or return a unique value.
    nodeKey = 'index',
    // node indent in px
    indent = $bindable(20),
    // Enable virtual list
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

    processor = createTreeProcessor([], {
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

    // Triggered when node checked changed
    onNodeChecked,
    // Triggered when click node
    onNodeSelected,
    // Triggered when close node
    onNodeOpened,
    // Triggered when open node
    onNodeClosed,
    // Triggered when node value changes, or batch update completed - behavioe depends up updateBehavior

    onUpdateValue
  }: {
    model: Array<NodeData>;
    processor?: TreeProcessor;
    updateBehavior?: 'modify' | 'new' | 'disabled';
    childrenKey?: string;
    textKey?: string;
    indent?: number;
    virtualization?: boolean;
    virtualizationPrerenderCount?: number;
    defaultOpen?: boolean;
    rtl?: boolean;
    btt?: boolean;
    nodeKey?: string | ((info: NodeInfo, index: number) => any);
    treeLine?: boolean;
    treeLineOffset?: number;
    class?: string;
    style?: string;

    // handler
    nodeInfoPreProcessor?: (info: NodeInfo) => NodeInfo;

    // slots
    tree_slot: Snippet<[{ data: NodeData; info: NodeInfo }]>;
    placeholder?: Snippet;

    // events
    onNodeChecked?: (e: NodeInfo) => void;
    onNodeSelected?: (e: NodeInfo) => void;
    onNodeOpened?: (e: NodeInfo) => void;
    onNodeClosed?: (e: NodeInfo) => void;
    onUpdateValue?: (e: NodeInfo | NodeInfo[]) => void;
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
  let nodeInfos: Array<NodeInfo> = $state([]);

  // used to render the render the virtual list
  // vuejs: used to be called statsFlat
  let computedTree: Array<NodeInfo> = $state([]);

  // node being dragged
  let dragNode: NodeInfo | null = null;
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
    console.log('model change detected');

    // TODO: change this? isDragging triggered in Vue2 because its array is not same with Vue3
    const isDragging = dragOvering || dragNode;
    if (isDragging || _ignoreValueChangeOnce) {
      _ignoreValueChangeOnce = false;
    } else {
      console.log('Initializing model');
      processor.rawData = model;
      //TODO: refactor to nodeInfosToRender=processor.init(model)
      processor.init();

      nodeInfos = processor.nodeInfos!;
      computedTree = processor.nodeInfosToRender!;
    }
  });

  // only returns the visible nodes
  // vuejs: use to be visibleStats
  function filterVisibleNodes(): NodeInfo[] {
    let items = computedTree || [];
    if (btt) {
      //TODO: see if items.slice().reverse() works, it should
      items = items.slice();
      items.reverse();
    }

    items = items.filter(info => isVisible(info));

    return items;
  }

  // returns the top level nodeInfo
  function rootChildren() {
    return nodeInfos;
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

  // Get stat by node data.
  function getNodeInfo(nodeInfoOrNodeData: NodeInfo | NodeData): NodeInfo {
    // return reactiveFirstArg(processorMethodProxy('getNodeInfo'))(nodeInfoOrNodeData);
    return processor.getNodeInfo(nodeInfoOrNodeData);
  }

  // Detect the tree if has the stat of given node data.
  function has(nodeInfoOrNodeData: NodeInfo | NodeData): boolean {
    // return reactiveFirstArg(processorMethodProxy('has'))(nodeInfoOrNodeData);
    return processor.has(nodeInfoOrNodeData);
  }

  // Recalculate checked state of all nodes from end to root
  function updateCheckboxes(): void {
    // return reactiveFirstArg(processorMethodProxy('updateCheck'))(undefined);
    processor.updateCheckboxes();
  }

  // Get all checked nodes. Param withDemi means including half checked
  function getChecked(withDemi): NodeInfo[] {
    // return reactiveFirstArg(processorMethodProxy('getChecked'))(withDemi);
    return processor.getChecked(withDemi);
  }

  // Get all unchecked nodes. Param withDemi means including half checked.
  function getUnchecked(withDemi): NodeInfo[] {
    return processor.getUnchecked(withDemi);
    // return reactiveFirstArg(processorMethodProxy('getUnchecked'))(withDemi);
  }

  // Open all nodes
  function openAll(): void {
    console.log('openAll');
    processor.openAll();
    // return reactiveFirstArg(processorMethodProxy('openAll'))(undefined);
  }

  // Open a node and its all parents to make it visible. The argument nodeDataOrStat can be node data or node stat
  function openNodeAndParents(nodeInfoOrNodeData: NodeInfo | NodeData): void {
    processor.openNodeAndParents(nodeInfoOrNodeData);
    // return reactiveFirstArg(processorMethodProxy('openNodeAndParents'))(nodeInfoOrNodeData);
  }

  // Close all nodes
  function closeAll(): void {
    console.log('closeAll');
    processor.closeAll();
    // return reactiveFirstArg(processorMethodProxy('closeAll'))(undefined);
  }

  // Detect if node is visible. When parent invisible or closed, children are invisible. Param statOrNodeData can be node data or stat.
  function isVisible(NodeInfoOrNodeData: NodeInfo | NodeData): boolean {
    return processor.isVisible(NodeInfoOrNodeData);
    // return reactiveFirstArg(processorMethodProxy('isVisible'))(NodeInfoOrNodeData);
  }

  // Move node. parent is null means root. Similar to add
  function move(info: NodeInfo, parent: NodeInfo | undefined, index: number) {
    return processor.move(info, parent, index);
    // return reactiveFirstArg(processorMethodProxy('move'))(info, parent, index);
  }

  // Add node. parent is null means root.
  function add(data: NodeData, parent?: NodeInfo | null, index?: number | null): void {
    return processor.add(data, parent, index);
    //return reactiveFirstArg(processorMethodProxy('add'))(data, parent, index);
  }

  // return the component's top level htmlelement
  function getRootEl() {
    return rootElement as HTMLElement;
  }

  // Add multiple continuously nodes. parent is null means root.
  function addMulti(dataArr: NodeData[], parent?: NodeInfo | null, startIndex?: number | null) {
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
  function remove(info: NodeInfo): boolean {
    // return reactiveFirstArg(processorMethodProxy('remove'))(info);
    return processor.remove(info);
  }

  // Remove multiple nodes.
  function removeMulti(dataArr: NodeData[]) {
    const cloned = [...dataArr];
    batchUpdate(() => {
      for (const data of cloned) {
        remove(data);
      }
    });
  }

  // Iterate all parents of a node. Param opt.withSelf means including it self
  // ie. for (const parentStat of tree.iterateParent(nodeStat, { withSelf: false })) { ... }
  function iterateParent(info: NodeInfo, opt?: { withSelf: boolean }) {
    return processor.iterateParent(info, opt);
    // return reactiveFirstArg(processorMethodProxy('iterateParent'))(info, opt);
  }

  // Get all siblings of a node including it self.
  function getSiblings(info: NodeInfo): NodeInfo[] {
    return processor.getSiblings(info);
    // return reactiveFirstArg(processorMethodProxy('getSiblings'))(info);
  }

  // Generate and get current data without stat. Param filter can handle each node data
  function getData(filter?: (data: NodeData) => any, root?: NodeInfo): any[] {
    return processor.getData(filter, root);
    // return reactiveFirstArg(processorMethodProxy('getData'))(filter, root);
  }

  // Merge multiple data update actions, to make it only emit new data once
  function batchUpdate(task: () => any | Promise<any>) {
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
  {#snippet vl_slot({ item: nodeInfo }: VLSlotSignature<NodeInfo>)}
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
        onNodeOpened={info => onNodeOpened?.(info)}
        onNodeClosed={info => onNodeClosed?.(info)}
        onNodeSelected={info => onNodeSelected?.(info)}
        onNodeChecked={info => onNodeChecked?.(info)}>
        {#snippet tn_slot(params)}
          {#if params.data === placeholderData}
            <div class="drag-placeholder he-tree-drag-placeholder">
              {#if placeholder}
                {@render placeholder()}
              {/if}
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
