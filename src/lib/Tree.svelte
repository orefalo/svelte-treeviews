<script lang="ts">
  import { VirtualList } from '$lib/virtuallist';
  import TreeNode from './TreeNode.svelte';
  import * as hp from './jshelper';
  import type { Stat, TreeProcessor } from './treeutils';
  import { svelteMakeTreeProcessor } from './TreeProcessorSvelte.svelte';
  import type { Snippet } from 'svelte';

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
    model: Array<unknown>;
    updateBehavior?: 'modify' | 'new' | 'disabled';
    processor?: TreeProcessor;
    childrenKey?: string;
    textKey?: string;
    indent?: number;
    virtualization?: boolean;
    virtualizationPrerenderCount?: number;
    defaultOpen?: boolean;
    statHandler?: (stat: Stat<any>) => Stat<any>;
    rtl?: boolean;
    btt?: boolean;
    nodeKey?: 'index' | ((stat: Stat<any>, index: number) => any);
    treeLine?: boolean;
    treeLineOffset?: number;
    prepend?: Snippet;
    append?: Snippet;
    onNodeChecked?: (e: Stat<unknown>) => void;
    onNodeClicked?: (e: Stat<unknown>) => void;
    onNodeOpened?: (e: Stat<unknown>) => void;
    onNodeClosed?: (e: Stat<unknown>) => void;
  } = $props();

  let stats: TreeProcessor['stats'] = $state([]);
  let statsFlat: TreeProcessor['statsFlat'] = [];
  let dragNode: Stat<any> | null = null;
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

  function visibleStats(): Stat<unknown>[] {
    // const { statsFlat, isVisible } = this;
    let items = statsFlat || [];
    if (btt) {
      items = items.slice();
      items.reverse();
    }
    return items.filter((stat: Stat<unknown>) => operations.isVisible(stat));
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

  function getOperations() {
    return operations;
  }

  const operations = {
    getStat: reactiveFirstArg(processorMethodProxy('getStat')) as TreeProcessor['getStat'],
    has: reactiveFirstArg(processorMethodProxy('has')) as TreeProcessor['has'],
    updateCheck: processorMethodProxy('updateCheck') as TreeProcessor['updateCheck'],
    getChecked: processorMethodProxy('getChecked') as TreeProcessor['getChecked'],
    getUnchecked: processorMethodProxy('getUnchecked') as TreeProcessor['getUnchecked'],
    openAll: processorMethodProxy('openAll') as TreeProcessor['openAll'],
    closeAll: processorMethodProxy('closeAll') as TreeProcessor['closeAll'],
    openNodeAndParents: processorMethodProxy(
      'openNodeAndParents'
    ) as TreeProcessor['openNodeAndParents'],
    isVisible: processorMethodProxy('isVisible') as TreeProcessor['isVisible'],
    move: processorMethodProxyWithBatchUpdate('move') as TreeProcessor['move'],
    add: reactiveFirstArg(processorMethodProxyWithBatchUpdate('add')) as TreeProcessor['add'],
    remove: processorMethodProxy('remove') as TreeProcessor['remove'],
    iterateParent: processorMethodProxy('iterateParent') as TreeProcessor['iterateParent'],
    getSiblings: processorMethodProxy('getSiblings') as TreeProcessor['getSiblings'],
    getData: processorMethodProxy('getData') as hp.ReplaceReturnType<
      TreeProcessor['getData'],
      any[]
    >
  };

  function addMulti(dataArr: any[], parent?: Stat<any> | null, startIndex?: number | null) {
    batchUpdate(() => {
      let index = startIndex;
      for (const data of dataArr) {
        operations.add(data, parent, index);
        if (index != null) {
          index++;
        }
      }
    });
  }

  function removeMulti(dataArr: any[]) {
    batchUpdate(() => {
      for (const data of dataArr) {
        operations.remove(data);
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
      _updateValue(updateBehavior === 'new' ? operations.getData() : valueComputed());
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
      let v = $state(arg1);
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
  modelCount={stats.length}
  itemSize={25}>
  {#snippet slot({ item: stat, style, index })}
    <TreeNode
      zclass={stat.class +
        (stat.data === placeholderData ? ' drag-placeholder-wrapper' : '') +
        (stat === dragNode ? 'dragging-node' : '')}
      zstyle={stat.style}
      {stat}
      {rtl}
      {btt}
      {indent}
      {treeLine}
      {treeLineOffset}
      {processor}
      onclick={onNodeClicked && onNodeClicked(stat)}
      onOpen={onNodeOpened && onNodeOpened(stat)}
      onClose={onNodeClosed && onNodeClosed(stat)}
      onCheck={onNodeChecked && onNodeChecked(stat)}>
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
