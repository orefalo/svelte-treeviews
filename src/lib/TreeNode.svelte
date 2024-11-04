<script lang="ts" generics="T">
  import { type TreeLineStyle } from './index';
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
    treeLineOffset = $bindable(),
    treeLineStyle = $bindable('orthogonal'),
    processor = $bindable(),
    class: className,
    style,

    // snippets
    tn_slot,

    // events
    onNodeOpened = $bindable(),
    onNodeClosed = $bindable(),
    onNodeChecked = $bindable()
  }: {
    nodeInfo: NodeInfo<T>;
    rtl: boolean;
    btt: boolean;
    indent: number;
    treeLineOffset: number;
    treeLineStyle: TreeLineStyle;
    processor?: TreeProcessor<T>;
    class?: string;
    style?: string;

    tn_slot: Snippet<[{ data: T; info: NodeInfo<T> }]>;

    onNodeOpened?: (info: NodeInfo<T>) => void;
    onNodeClosed?: (info: NodeInfo<T>) => void;
    onNodeChecked?: (info: NodeInfo<T>) => void;
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

    if (processor?.afterOneCheckChanged(nodeInfo)) {
      onNodeChecked?.(nodeInfo);
    }
  });

  $effect(() => {
    const open = nodeInfo.expended;
    open ? onNodeOpened?.(nodeInfo) : onNodeClosed?.(nodeInfo);
  });

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
  class={clsx('tree-node', className, treeLineStyle !== 'none' && 'tvtree-node--with-tree-line')}
  style={indentStyle}>
  {#if treeLineStyle !== 'none'}
    {#each vLines as line}
      <div class="tvtree-line tvtree-vline" style={line.style}></div>
    {/each}
    {#if nodeInfo.level > 1 && treeLineStyle === 'orthogonal'}
      <div class="tvtree-line tvtree-hline" style={hLineStyle}></div>
    {/if}
  {/if}
  <div class="tvtree-node-inner">
    {@render tn_slot({ data: nodeInfo.data, info: nodeInfo })}
  </div>
</div>

<style global>
  .tvtree-node--with-tree-line {
    position: relative;
  }

  .tvtree-line {
    position: absolute;
    background-color: #bbbbbb;
  }

  .tvtree-vline {
    width: 1px;
    top: 0;
    bottom: 0;
  }

  .tvtree-hline {
    height: 1px;
    top: 50%;
    width: 10px;
  }
</style>
