<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { Stat } from './treeutils'

  let {
    stat,
    // right or left layout
    rtl = false,
    // bottomOrTop
    btt = false,
    indent = 20,
    treeLine = true,
    treeLineOffset = 10,
    processor,

    // events
    onOpen,
    onClose,
    onCheck,

    // snippets
    spot,
    class: className,
    style
  }: {
    stat: Stat<unknown>
    rtl: boolean
    btt: boolean
    indent: number
    treeLine: boolean
    treeLineOffset: number
    processor?: { afterOneCheckChanged: (s: Stat<unknown>) => boolean }
    onOpen?: (stat: Stat<unknown>) => void
    onClose?: Function /*(stat: Stat<unknown>) => void;*/
    onCheck?: (stat: Stat<unknown>) => void
    spot: Snippet<[{ indentStyle: string }]>
    class: string
    style: string
  } = $props()

  let indentStyle: string = $derived(
    `${!rtl ? 'paddingLeft' : 'paddingRight'}:${indent * (stat.level - 1)}px`
  )
  let hLineStyle = $derived(
    `${rtl ? 'right' : 'left'}:${(stat.level - 2) * indent + treeLineOffset}px`
  )

  $effect(() => {
    const open = stat.open

    if (justToggleOpen) {
      return
    }
    open ? onOpen?.(stat) : onClose?.(stat)

    afterToggleOpen()
  })

  $effect(() => {
    const checked = stat.checked
    // fix issue: https://github.com/phphe/he-tree/issues/98
    // when open/close above node, the after nodes' states 'checked' and 'open' will be updated. It should be caused by Vue's key. We don't use Vue's key prop.
    if (justToggleOpen) {
      return
    }
    if (processor?.afterOneCheckChanged(stat)) {
      onCheck?.(stat)
    }
  })

  let justToggleOpen = false
  const afterToggleOpen = () => {
    justToggleOpen = true
    setTimeout(() => {
      justToggleOpen = false
    }, 100)
  }

  let vLines: Array<{
    style: string
  }> = $derived.by(() => {
    const lines: Array<{ style: string }> = []
    const hasNextVisibleNode = (stat: Stat<unknown>) => {
      if (stat.parent) {
        let i = stat.parent?.children.indexOf(stat)
        do {
          i++
          let next = stat.parent.children[i]
          if (next) {
            if (!next.hidden) {
              return true
            }
          } else {
            break
          }
          // eslint-disable-next-line no-constant-condition
        } while (true)
      }
      return false
    }
    const leftOrRight = rtl ? 'right' : 'left'
    const bottomOrTop = btt ? 'top' : 'bottom'
    let current: Stat<unknown> | null = stat
    while (current) {
      let left = (current.level - 2) * indent + treeLineOffset
      const hasNext = hasNextVisibleNode(current)
      const addLine = () => {
        lines.push({
          style: `${leftOrRight}:${left}px;${bottomOrTop}:${hasNext ? 0 : '50%'}`
        })
      }
      if (current === stat) {
        if (current.level > 1) {
          addLine()
        }
      } else if (hasNext) {
        addLine()
      }
      current = current.parent
    }
    return lines
  })
</script>

<div
  class={`tree-node ${className}`}
  class:tree-node--with-tree-line={treeLine}
  style={`${style} ${indentStyle}`}>
  {#if treeLine}
    {#each vLines as line}
      <div class="tree-line tree-vline" style={line.style}></div>
      {#if stat.level > 1}
        <div class="tree-line tree-hline" style={hLineStyle}></div>
      {/if}
    {/each}
  {/if}
  <div class="tree-node-inner">
    {@render spot({ indentStyle })}
  </div>
</div>

<style>
  .tree-node--with-tree-line {
    position: relative;
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
