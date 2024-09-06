<script lang="ts">
  import { VirtualList } from '$lib/virtuallist';
  import TreeNode from './TreeNode.svelte';
  import { CHILDREN, TreeProcessor } from './TreeProcessor.svelte';
  import { createTreeProcessor } from './TreeProcessorFactory';
  import type { NodeData, NodeInfo } from './NodeInfo';
  import type { Snippet } from 'svelte';
  import clsx from 'clsx';

  let {
    // the model is only used as an interface with the component, model -> processor() -> (nodeInfos,nodeInfosFlat)
    model,

    processor = createTreeProcessor([], {
      // do not call init(), will be called manually later
      noInitialization: true
    }),

    // specifies how onUpdateValue() is triggered
    updateBehavior = 'modify',
    // json.key is used for sub nodes
    childrenKey = CHILDREN,
    // json.key used for leaf nodes
    textKey = 'text',
    // node indent in px
    indent = 20,
    // Enable virtual list
    virtualization = false,
    //  The number of rendered list items at initialization. Suits for SSR(Server Side Render).
    virtualizationPrerenderCount = 20,
    // Open all nodes by default.
    defaultOpen = true,
    // Display from right to left.
    rtl = false,
    // Display bottom to top
    btt = false,
    // Use index when rendering node's indexes or return a unique value.
    nodeKey = 'index',
    // Display tree line.
    treeLine = false,
    // Horizontal displacement of tree lines, unit: pixels.
    treeLineOffset = 8,
    // css class
    class: className = '',

    style = '',

    // used to apply changes to the nodeInfo prior to processor()
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
    onNodeClicked,
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
    onNodeClicked?: (e: NodeInfo) => void;
    onNodeOpened?: (e: NodeInfo) => void;
    onNodeClosed?: (e: NodeInfo) => void;
    onUpdateValue?: (e: NodeInfo | NodeInfo[]) => void;
  } = $props();

  // this is the model of the tree, it holds meta-data and data
  //let nodeInfos: Array<NodeInfo> = $state([]);

  // used to render the tree
  let computedTree: Array<NodeInfo> = $state([]);

  // node being dragged
  let dragNode: NodeInfo | null = null;
  let dragOvering: boolean = false;
  let placeholderData: {} = {};
  let batchUpdateWaiting: boolean = false;

  let _ignoreValueChangeOnce: boolean = false;

  $effect(() => {
    // look for model changes
    model;
    console.log('model change detected');

    // TODO: change this? isDragging triggered in Vue2 because its array is not same with Vue3
    const isDragging = dragOvering || dragNode;
    if (isDragging || _ignoreValueChangeOnce) {
      _ignoreValueChangeOnce = false;
    } else {
      console.log('Initializing model');
      processor.nodeData = model;
      processor.init();

      // what about     nodeInfosToRender=processor.init(model)

      // nodeInfos = processor.nodeInfos!;
      computedTree = processor.nodeInfosToRender!;
    }
  });

  function valueComputed() {
    return model || [];
  }

  // only returns the visible nodes
  function visibleNodes(): NodeInfo[] {
    let items = computedTree || [];
    if (btt) {
      items = items.slice().reverse();
    }
    return items.filter((info: NodeInfo) => isVisible(info));
  }

  function rootChildren() {
    return processor.nodeInfos;
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
    if (value !== valueComputed()) {
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
    processor.closeAll();
    // return reactiveFirstArg(processorMethodProxy('closeAll'))(undefined);
  }

  // Detect if node is visible. When parent invisible or closed, children are invisible. Param statOrNodeData can be node data or stat.
  function isVisible(NodeInfoOrNodeData: NodeInfo | NodeData): boolean {
    return processor.isVisible(NodeInfoOrNodeData);
    // return reactiveFirstArg(processorMethodProxy('isVisible'))(NodeInfoOrNodeData);
  }

  // Move node. parent is null means root. Similar to add
  function move(info: NodeInfo, parent: NodeInfo | null, index: number) {
    return processor.move(info, parent, index);
    // return reactiveFirstArg(processorMethodProxy('move'))(info, parent, index);
  }

  // Add node. parent is null means root.
  function add(data: NodeData, parent?: NodeInfo | null, index?: number | null): void {
    return processor.add(data, parent, index);
    //return reactiveFirstArg(processorMethodProxy('add'))(data, parent, index);
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
    batchUpdate(() => {
      for (const data of dataArr) {
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
      _updateValue(updateBehavior === 'new' ? getData() : valueComputed());
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
  class={clsx(
    'he-tree',
    rtl && 'he-tree--rtl rtl',
    dragOvering && 'he-tree--drag-overing drag-overing'
  )}
  {style}
  height={500}
  isDisabled={!virtualization}
  width="auto"
  model={visibleNodes()}
  modelCount={processor.nodeInfos?.length || 0}
  itemSize={25}>
  {#snippet vl_slot({ item: nodeInfo, style, index })}
    {#if nodeInfo}
      <TreeNode
        class={clsx(nodeInfo.class, {
          'drag-placeholder-wrapper': nodeInfo.nodeData === placeholderData,
          'dragging-node': nodeInfo === dragNode
        })}
        style={nodeInfo.style}
        {nodeInfo}
        {rtl}
        {btt}
        {indent}
        {treeLine}
        {treeLineOffset}
        {processor}
        onNodeOpened={(info: NodeInfo) => onNodeOpened && onNodeOpened(info)}
        onNodeclosed={(info: NodeInfo) => onNodeClosed && onNodeClosed(info)}
        onNodeChecked={(info: NodeInfo) => onNodeChecked && onNodeChecked(info)}>
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
