<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import type { NodeInfo } from './NodeInfo.svelte';
  import clsx from 'clsx';
  import type { TreeProcessor } from './TreeProcessor.svelte';

  let {
    nodeInfo,
    // right or left layout
    rtl = $bindable(),
    // bottomToTop
    btt = $bindable(),
    indent = $bindable(),
    treeLine = $bindable(),
    treeLineOffset = $bindable(),
    processor = $bindable(),
    class: className,
    style,

    // snippets
    tn_slot,

    // events
    onNodeOpened,
    onNodeClosed,
    onNodeChecked,
    onNodeSelected
  }: {
    nodeInfo: NodeInfo<T>;
    rtl: boolean;
    btt: boolean;
    indent: number;
    treeLine: boolean;
    treeLineOffset: number;
    processor?: TreeProcessor<T>;
    class?: string;
    style?: string;

    tn_slot: Snippet<[{ data: T; info: NodeInfo<T> }]>;

    onNodeOpened?: (info: NodeInfo<T>) => void;
    onNodeClosed?: (info: NodeInfo<T>) => void;
    onNodeChecked?: (info: NodeInfo<T>) => void;
    onNodeSelected?: (info: NodeInfo<T>) => void;
  } = $props();

  let indentStyle = $derived(
    style
      ? `${style};${!rtl ? 'padding-left' : 'padding-right'}:${indent * (nodeInfo.level - 1)}px`
      : `${!rtl ? 'padding-left' : 'padding-right'}:${indent * (nodeInfo.level - 1)}px`
  );

  let hLineStyle = $derived(
    `${rtl ? 'right' : 'left'}:${(nodeInfo.level - 2) * indent + treeLineOffset}px`
  );

  $effect(() => {
    const checked = nodeInfo.checked;
    // fix issue: https://github.com/phphe/he-tree/issues/98
    // when open/close above node, the after nodes' states 'checked' and 'open' will be updated. It should be caused by Vue's key. We don't use Vue's key prop.
    if (justToggleOpen) {
      return;
    }
    if (processor?.afterOneCheckChanged(nodeInfo)) {
      onNodeChecked?.(nodeInfo);
    }
  });

  $effect(() => {
    const open = nodeInfo.expended;

    if (justToggleOpen) {
      return;
    }
    open ? onNodeOpened?.(nodeInfo) : onNodeClosed?.(nodeInfo);

    afterToggleOpen();
  });

  let justToggleOpen = false;
  const afterToggleOpen = () => {
    justToggleOpen = true;
    setTimeout(() => {
      justToggleOpen = false;
    }, 100);
  };

  const vLines: Array<{
    style: string;
  }> = $derived.by(() => {
    const lines: Array<{ style: string }> = [];
    const hasNextVisibleNode = (nodeInfo: NodeInfo<T>) => {
      if (nodeInfo.parent) {
        let i = nodeInfo.parent?.children.indexOf(nodeInfo);

        do {
          i++;
          const next = nodeInfo.parent.children[i];
          if (next) {
            if (!next.hidden) {
              return true;
            }
          } else {
            break;
          }
          // eslint-disable-next-line no-constant-condition
        } while (true);
      }
      return false;
    };
    const leftOrRight = rtl ? 'right' : 'left';
    const bottomOrTop = btt ? 'top' : 'bottom';

    let current: NodeInfo<T> | undefined = nodeInfo;
    while (current) {
      const left = (current.level - 2) * indent + treeLineOffset;
      const hasNext = hasNextVisibleNode(current);
      const addLine = () => {
        lines.push({
          style: `${leftOrRight}:${left}px;${bottomOrTop}:${hasNext ? '0' : '50%'}`
        });
      };
      if (current === nodeInfo) {
        if (current.level > 1) {
          addLine();
        }
      } else if (hasNext) {
        addLine();
      }
      current = current.parent;
    }
    return lines;
  });
</script>

<div
  class={clsx('tree-node', className, treeLine && 'tree-node--with-tree-line')}
  style={indentStyle}>
  {#if treeLine}
    {#each vLines as line}
      <div class="tree-line tree-vline" style={line.style}></div>
    {/each}
    {#if nodeInfo.level > 1}
      <div class="tree-line tree-hline" style={hLineStyle}></div>
    {/if}
  {/if}
  <div class="tree-node-inner">
    {@render tn_slot({ data: nodeInfo.data, info: nodeInfo })}
  </div>
</div>

<style>
  .rtl {
    direction: rtl;
  }

  .tree-line {
    position: absolute;
    background-color: #bbbbbb;
  }

  .tree-vline {
    width: 1px;
    top: 0;
    bottom: 0;
  }

  .tree-hline {
    height: 1px;
    top: 50%;
    width: 10px;
  }
</style>
