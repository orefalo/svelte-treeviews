<script lang="ts">
  import { VirtualList } from '$lib/virtuallist';
  import TreeNode from './TreeNode.svelte';
  import { TreeProcessor } from './TreeProcessor';
  import { svelteMakeTreeProcessor } from './TreeProcessor.svelte.js';
  import type { NodeData, NodeInfo } from './NodeInfo';
  import type { Snippet } from 'svelte';

  let {
    model,

    // specifies how onUpdateValue() is triggered
    updateBehavior = 'modify',
    processor = svelteMakeTreeProcessor([], {
      noInitialization: true
    }),
    // json.key is used for sub nodes
    childrenKey = 'children',
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

    nodeInfoHandler,

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
    updateBehavior?: 'modify' | 'new' | 'disabled';
    processor?: TreeProcessor;
    childrenKey?: string;
    textKey?: string;
    indent?: number;
    virtualization?: boolean;
    virtualizationPrerenderCount?: number;
    defaultOpen?: boolean;
    rtl?: boolean;
    btt?: boolean;
    nodeKey?: 'index' | ((nodeInfo: NodeInfo, index: number) => any);
    treeLine?: boolean;
    treeLineOffset?: number;
    class?: string;

    // handler
    //TODO rename nodeInfoHandler
    nodeInfoHandler?: (nodeInfo: NodeInfo) => NodeInfo;

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

  let nodeInfos: TreeProcessor['nodeInfos'] = $state([]);
  let statsFlat: TreeProcessor['nodeInfosFlat'] = [];
  let dragNode: NodeInfo | null = null;
  let dragOvering: boolean = false;
  let placeholderData: {} = {};
  let batchUpdateWaiting: boolean = false;

  let _ignoreValueChangeOnce: boolean = false;

  function valueComputed() {
    return model || [];
  }

  $effect(() => {
    // look for model changes
    model;

    // TODO: change this? isDragging triggered in Vue2 because its array is not same with Vue3
    const isDragging = dragOvering || dragNode;
    if (isDragging || _ignoreValueChangeOnce) {
      _ignoreValueChangeOnce = false;
    } else {
      //const { processor } = this
      processor.nodeData = model;
      processor.init();
      nodeInfos = processor.nodeInfos!;
      statsFlat = processor.nodeInfosFlat!;
    }
  });

  function visibleStats(): NodeInfo[] {
    // const { statsFlat, isVisible } = this;
    let items = statsFlat || [];
    if (btt) {
      items = items.slice();
      items.reverse();
    }
    return items.filter((stat: NodeInfo) => isVisible(stat));
  }

  function rootChildren() {
    return nodeInfos;
  }

  function _emitValue(value: any[]) {
    if (onUpdateValue) onUpdateValue(value);
    // this.$emit('update:modelValue', value);
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
  function getNodeInfo(NodeInfoOrNodeData: any): NodeInfo {
    return reactiveFirstArg(processorMethodProxy('getNodeInfo'))(NodeInfoOrNodeData);
  }

  // Detect the tree if has the stat of given node data.
  function has(NodeInfoOrNodeData: NodeInfo | any): boolean {
    return reactiveFirstArg(processorMethodProxy('has'))(NodeInfoOrNodeData);
  }

  // Recalculate checked state of all nodes from end to root
  function updateCheck(): void {
    return reactiveFirstArg(processorMethodProxy('updateCheck'))(undefined);
  }

  // Get all checked nodes. Param withDemi means including half checked
  function getChecked(withDemi): NodeInfo[] {
    return reactiveFirstArg(processorMethodProxy('getChecked'))(withDemi);
  }

  // Get all unchecked nodes. Param withDemi means including half checked.
  function getUnchecked(withDemi): NodeInfo[] {
    return reactiveFirstArg(processorMethodProxy('getUnchecked'))(withDemi);
  }

  // Open all nodes
  function openAll(): void {
    return reactiveFirstArg(processorMethodProxy('openAll'))(undefined);
  }

  // Open a node and its all parents to make it visible. The argument nodeDataOrStat can be node data or node stat
  function openNodeAndParents(NodeInfoOrNodeData: NodeInfo | any): void {
    return reactiveFirstArg(processorMethodProxy('openNodeAndParents'))(NodeInfoOrNodeData);
  }

  // Close all nodes
  function closeAll(): void {
    return reactiveFirstArg(processorMethodProxy('closeAll'))(undefined);
  }

  // Detect if node is visible. When parent invisible or closed, children are invisible. Param statOrNodeData can be node data or stat.
  function isVisible(NodeInfoOrNodeData: NodeInfo | any): boolean {
    return reactiveFirstArg(processorMethodProxy('isVisible'))(NodeInfoOrNodeData);
  }

  // Move node. parent is null means root. Similar to add
  function move(stat: NodeInfo, parent: NodeInfo | null, index: number) {
    return reactiveFirstArg(processorMethodProxy('move'))(stat, parent, index);
  }

  // Add node. parent is null means root.
  function add(nodeData: any, parent?: NodeInfo | null, index?: number | null): void {
    return reactiveFirstArg(processorMethodProxy('add'))(nodeData, parent, index);
  }

  // Add multiple continuously nodes. parent is null means root.
  function addMulti(dataArr: any[], parent?: NodeInfo | null, startIndex?: number | null) {
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
  function remove(nodeInfo: NodeInfo): boolean {
    return reactiveFirstArg(processorMethodProxy('remove'))(nodeInfo);
  }

  // Remove multiple nodes.
  function removeMulti(dataArr: any[]) {
    batchUpdate(() => {
      for (const data of dataArr) {
        remove(data);
      }
    });
  }

  // Iterate all parents of a node. Param opt.withSelf means including it self
  // ie. for (const parentStat of tree.iterateParent(nodeStat, { withSelf: false })) { ... }
  function iterateParent(stat: NodeInfo, opt?: { withSelf: boolean }) {
    return reactiveFirstArg(processorMethodProxy('iterateParent'))(stat, opt);
  }

  // Get all siblings of a node including it self.
  function getSiblings(stat: NodeInfo): NodeInfo[] {
    return reactiveFirstArg(processorMethodProxy('getSiblings'))(stat);
  }

  // Generate and get current data without stat. Param filter can handle each node data
  function getData(filter?: (data: any) => any, root?: NodeInfo): any[] {
    return reactiveFirstArg(processorMethodProxy('getData'))(filter, root);
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

  function processorMethodProxy(name: string) {
    return function (...args: any) {
      // @ts-ignore
      return processor[name](...args);
    };
  }
  function processorMethodProxyWithBatchUpdate(name: string) {
    return function (...args: any) {
      // @ts-ignore
      return batchUpdate(() => {
        // @ts-ignore
        return processor[name](...args);
      });
    };
  }

  function reactiveFirstArg(func: Function) {
    return function (arg1: any, ...args: any) {
      const v = $state(arg1);
      if (arg1) {
        // @ts-ignore
        return func.call(this, v, ...args);
      }
      // @ts-ignore
      return func.call(this, arg1, ...args);
    };
  }
</script>

<VirtualList
  class={`he-tree${rtl ? ' he-tree--rtl rtl' : ''}${dragOvering ? ' he-tree--drag-overing drag-overing' : ''}`}
  model={nodeInfos}
  height={500}
  width="auto"
  modelCount={nodeInfos?.length || 0}
  itemSize={25}>
  {#snippet vl_slot({ item: nodeInfo, style, index })}
    {#if nodeInfo}
      <TreeNode
        class={(nodeInfo.class ? nodeInfo.class : '') +
          (nodeInfo.data === placeholderData ? ' drag-placeholder-wrapper' : '') +
          (nodeInfo === dragNode ? ' dragging-node' : '')}
        style={nodeInfo.style}
        {nodeInfo}
        {rtl}
        {btt}
        {indent}
        {treeLine}
        {treeLineOffset}
        {processor}
        onopen={(nodeInfo: NodeInfo) => onNodeOpened && onNodeOpened(nodeInfo)}
        onclose={(nodeInfo: NodeInfo) => onNodeClosed && onNodeClosed(nodeInfo)}
        oncheck={(nodeInfo: NodeInfo) => onNodeChecked && onNodeChecked(nodeInfo)}>
        {#snippet tn_slot({ data, info })}
          {#if nodeInfo.nodeData === placeholderData}
            <div class="drag-placeholder he-tree-drag-placeholder">
              {#if placeholder}
                {@render placeholder()}
              {/if}
            </div>
          {:else}
            {@render tree_slot({ data, info })}
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

  .he-tree-drag-placeholder {
    background: #ddf2f9;
    border: 1px dashed #00d9ff;
    height: 22px;
    width: 100%;
  }
</style>
