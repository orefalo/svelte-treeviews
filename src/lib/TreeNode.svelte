<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { NodeData, NodeInfo } from './NodeInfo';
  import clsx from 'clsx';

  const _emptyFunction = () => {};

  let {
    nodeInfo,
    // right or left layout
    rtl = false,
    // bottomOrTop
    btt = false,
    indent = 20,
    treeLine = true,
    treeLineOffset = 10,
    processor,
    class: className = '',
    style = '',

    // snippets
    tn_slot,

    // events
    onopen = _emptyFunction,
    onclose = _emptyFunction,
    oncheck = _emptyFunction
  }: {
    nodeInfo: NodeInfo;
    rtl: boolean;
    btt: boolean;
    indent: number;
    treeLine: boolean;
    treeLineOffset: number;
    processor?: { afterOneCheckChanged: (s: NodeInfo) => boolean };
    class?: string;
    style?: string;

    tn_slot: Snippet<[{ data: NodeData; info: NodeInfo }]>;

    onopen: (info: NodeInfo) => void;
    onclose: (info: NodeInfo) => void;
    oncheck: (info: NodeInfo) => void;
  } = $props();

  let indentStyle = $derived(
    `${!rtl ? 'paddingLeft' : 'paddingRight'}:${indent * (nodeInfo.level - 1)}px`
  );

  let hLineStyle = $derived(
    `${rtl ? 'right' : 'left'}:${(nodeInfo.level - 2) * indent + treeLineOffset}px`
  );

  $effect(() => {
    const open = nodeInfo.open;

    console.log('toggleOpen');

    if (justToggleOpen) {
      return;
    }
    open ? onopen(nodeInfo) : onclose(nodeInfo);

    afterToggleOpen();
  });

  $effect(() => {
    const checked = nodeInfo.checked;
    // fix issue: https://github.com/phphe/he-tree/issues/98
    // when open/close above node, the after nodes' states 'checked' and 'open' will be updated. It should be caused by Vue's key. We don't use Vue's key prop.
    if (justToggleOpen) {
      return;
    }
    if (processor?.afterOneCheckChanged(nodeInfo)) {
      oncheck(nodeInfo);
    }
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
    const hasNextVisibleNode = (nodeInfo: NodeInfo) => {
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

    let current: NodeInfo | null = nodeInfo;
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
  style={`${style} ${indentStyle}`}>
  {#if treeLine}
    {#each vLines as line}
      <div class="tree-line tree-vline" style={line.style}></div>
    {/each}
    {#if nodeInfo.level > 1}
      <div class="tree-line tree-hline" style={hLineStyle}></div>
    {/if}
  {/if}
  <div class="tree-node-inner">
    {@render tn_slot({ data: nodeInfo.nodeData, info: nodeInfo })}
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
