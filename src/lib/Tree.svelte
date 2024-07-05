<script lang="ts">
  import { VirtualList } from '$lib/virtuallist';
  import TreeNode from './TreeNode.svelte';
  import { TreeProcessor } from './treeutils';
  import { svelteMakeTreeProcessor } from './TreeProcessorSvelte.svelte';
  import type { Snippet } from 'svelte';
  import type { Stat } from './Stat';

  let {
    model,
    updateBehavior = 'modify',
    processor = svelteMakeTreeProcessor([], {
      noInitialization: true
    }),
    // json.key is used for sub nodes
    childrenKey = 'children',
    // json.key used for leaf nodes
    textKey = 'text',
    // node indent.
    indent = 20,
    virtualization = false,
    //  Render count for virtual list at start.
    virtualizationPrerenderCount = 20,
    // Open all nodes by default.
    defaultOpen = true,
    statHandler,
    // From right to left
    rtl = false,
    //From bottom to top
    btt = false,
    nodeKey = 'index',
    treeLine = false,
    treeLineOffset = 8,

    // snippets
    prepend,
    append,

    //
    onNodeChecked,
    onNodeClicked,
    onNodeOpened,
    onNodeClosed
  }: {
    // todo: rename to model
    model: Array<any>;
    updateBehavior?: 'modify' | 'new' | 'disabled';
    processor?: TreeProcessor<Stat>;
    childrenKey?: string;
    textKey?: string;
    indent?: number;
    virtualization?: boolean;
    virtualizationPrerenderCount?: number;
    defaultOpen?: boolean;
    statHandler?: (stat: Stat) => Stat;
    rtl?: boolean;
    btt?: boolean;
    nodeKey?: 'index' | ((stat: Stat, index: number) => any);
    treeLine?: boolean;
    treeLineOffset?: number;
    prepend?: Snippet;
    append?: Snippet;
    onNodeChecked?: (e: Stat) => void;
    onNodeClicked?: (e: Stat) => void;
    onNodeOpened?: (e: Stat) => void;
    onNodeClosed?: (e: Stat) => void;
  } = $props();

  let stats: TreeProcessor<Stat>['stats'] = $state([]);
  let statsFlat: TreeProcessor<Stat>['statsFlat'] = [];
  let dragNode: Stat | null = null;
  let dragOvering: boolean = false;
  let placeholderData: {} = {};
  let placeholderColspan: number = 1;
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
      processor.data = model;
      processor.init();
      stats = processor.stats!;
      statsFlat = processor.statsFlat!;
    }
  });

  function visibleStats(): Stat[] {
    // const { statsFlat, isVisible } = this;
    let items = statsFlat || [];
    if (btt) {
      items = items.slice();
      items.reverse();
    }
    return items.filter((stat: Stat) => isVisible(stat));
  }
  function rootChildren() {
    return stats;
  }

  function _emitValue(value: any[]) {
    // @ts-ignore
    this.$emit('update:modelValue', value);
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

  function getStat(statOrNodeData: any): Stat {
    return reactiveFirstArg(processorMethodProxy('getStat'))(statOrNodeData);
  }

  function has(statOrNodeData: Stat | any): boolean {
    return reactiveFirstArg(processorMethodProxy('has'))(statOrNodeData);
  }

  function updateCheck(): void {
    return reactiveFirstArg(processorMethodProxy('updateCheck'))(undefined);
  }

  function getChecked(withDemi): Stat[] {
    return reactiveFirstArg(processorMethodProxy('getChecked'))(withDemi);
  }

  function getUnchecked(withDemi): Stat[] {
    return reactiveFirstArg(processorMethodProxy('getUnchecked'))(withDemi);
  }
  function openAll(): void {
    return reactiveFirstArg(processorMethodProxy('openAll'))(undefined);
  }

  function closeAll(): void {
    return reactiveFirstArg(processorMethodProxy('closeAll'))(undefined);
  }

  function openNodeAndParents(statOrNodeData: Stat | any): void {
    return reactiveFirstArg(processorMethodProxy('openNodeAndParents'))(statOrNodeData);
  }

  function isVisible(statOrNodeData: Stat | any): boolean {
    return reactiveFirstArg(processorMethodProxy('isVisible'))(statOrNodeData);
  }

  function move(stat: Stat, parent: Stat | null, index: number) {
    return reactiveFirstArg(processorMethodProxy('move'))(stat, parent, index);
  }

  function add(nodeData: any, parent?: Stat | null, index?: number | null): void {
    return reactiveFirstArg(processorMethodProxy('add'))(nodeData, parent, index);
  }

  function remove(stat: Stat): boolean {
    return reactiveFirstArg(processorMethodProxy('remove'))(stat);
  }

  function iterateParent(stat: Stat, opt?: { withSelf: boolean }) {
    return reactiveFirstArg(processorMethodProxy('iterateParent'))(stat, opt);
  }

  function getSiblings(stat: Stat): Stat[] {
    return reactiveFirstArg(processorMethodProxy('getSiblings'))(stat);
  }

  function getData(filter?: (data: any) => any, root?: Stat): any[] {
    return reactiveFirstArg(processorMethodProxy('getData'))(filter, root);
  }

  // const operations = {
  //   //  getStat: reactiveFirstArg(processorMethodProxy('getStat')) as TreeProcessor['getStat'],
  //   //  has: reactiveFirstArg(processorMethodProxy('has')) as TreeProcessor['has'],
  //   //  updateCheck: processorMethodProxy('updateCheck') as TreeProcessor['updateCheck'],
  //   //  getChecked: processorMethodProxy('getChecked') as TreeProcessor['getChecked'],
  //   // getUnchecked: processorMethodProxy('getUnchecked') as TreeProcessor['getUnchecked'],
  //   //  openAll: processorMethodProxy('openAll') as TreeProcessor['openAll'],
  //   //closeAll: processorMethodProxy('closeAll') as TreeProcessor['closeAll'],
  //   // openNodeAndParents: processorMethodProxy(
  //   //   'openNodeAndParents'
  //   // ) as TreeProcessor['openNodeAndParents'],
  //   //isVisible: processorMethodProxy('isVisible') as TreeProcessor['isVisible'],
  //   //move: processorMethodProxyWithBatchUpdate('move') as TreeProcessor['move'],
  //   //add: reactiveFirstArg(processorMethodProxyWithBatchUpdate('add')) as TreeProcessor['add'],
  //   // remove: processorMethodProxy('remove') as TreeProcessor['remove'],
  //   // iterateParent: processorMethodProxy('iterateParent') as TreeProcessor['iterateParent'],
  //   // getSiblings: processorMethodProxy('getSiblings') as TreeProcessor['getSiblings'],
  //   // getData: processorMethodProxy('getData') as hp.ReplaceReturnType<
  //   //   TreeProcessor['getData'],
  //   //   any[]
  //   // >
  // };

  function addMulti(dataArr: any[], parent?: Stat | null, startIndex?: number | null) {
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

  function removeMulti(dataArr: any[]) {
    batchUpdate(() => {
      for (const data of dataArr) {
        remove(data);
      }
    });
  }

  // function getRootEl() {
  // 	// @ts-ignore
  // 	return this.$refs.vtlist.listElRef as HTMLElement;
  // }

  function batchUpdate(task: () => any | Promise<any>) {
    const r = ignoreUpdate(task);
    if (!batchUpdateWaiting) {
      _updateValue(updateBehavior === 'new' ? getData() : valueComputed());
    }
    return r;
  }

  function ignoreUpdate(task: () => any | Promise<any>) {
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
  class={`he-tree${rtl ? ' he-tree--rtl rtl' : ''}${dragOvering ? 'he-tree--drag-overing drag-overing' : ''}`}
  header={prepend}
  footer={append}
  model={stats}
  height={500}
  width="auto"
  modelCount={stats?.length || 0}
  itemSize={25}>
  {#snippet slot({ item: stat, style, index })}
    <TreeNode
      class={stat.class +
        (stat.data === placeholderData ? ' drag-placeholder-wrapper' : '') +
        (stat === dragNode ? 'dragging-node' : '')}
      style={stat.style}
      {stat}
      {rtl}
      {btt}
      {indent}
      {treeLine}
      {treeLineOffset}
      {processor}
      onopen={(stat: Stat) => onNodeOpened && onNodeOpened(stat)}
      onclose={(stat: Stat) => onNodeClosed && onNodeClosed(stat)}
      oncheck={(stat: Stat) => onNodeChecked && onNodeChecked(stat)}>
      {#snippet slot({ indentStyle }: { indentStyle: string })}
        {#if stat.data === placeholderData}
          <div class="drag-placeholder he-tree-drag-placeholder">DRAG PLACEHOLDER</div>
        {:else}
          <!-- <slot v-else :node="stat.data" :stat="stat" :indentStyle="indentStyle" :tree="self">{{ stat.data[textKey] }} -->
          <div style={indentStyle}>{stat.data[textKey]}</div>
        {/if}
      {/snippet}
    </TreeNode>
  {/snippet}
</VirtualList>

<style>
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
