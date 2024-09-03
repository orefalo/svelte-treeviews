<script lang="ts">
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';
  import type { NodeDico, Node } from './types';

  let { tree = $bindable(), node }: { tree: NodeDico; node: Node } = $props();

  const flipDurationMs = 300;

  function handleDndConsider(e) {
    node.children = e.detail.items;
  }

  function handleDndFinalize(e) {
    node.children = e.detail.items;
    tree = { ...tree };
  }
</script>

<b style="color:{node?.color}">{node?.name}</b>
{#if node?.children}
  <section
    use:dndzone={{ items: node.children || [], flipDurationMs, centreDraggedOnCursor: true }}
    onconsider={handleDndConsider}
    onfinalize={handleDndFinalize}>
    {#if node.children}
      {#each node.children as item (item.id)}
        <div animate:flip={{ duration: flipDurationMs }} class="item">
          <svelte:self bind:tree node={tree[item.id]} />
        </div>
      {/each}
    {/if}
  </section>
{/if}

<style>
  section {
    width: auto;
    max-width: 400px;
    border: 0 solid black;
    padding: 0.4em;
    /* this will allow the dragged element to scroll the list */
    overflow-y: auto;
    height: auto;
    background-color: rgba(100, 100, 100, 0.1);
  }
  div {
    width: 90%;
    padding: 0.3em;
    border: 0 solid blue;
    margin: 0.15em 0;
  }
  .item {
    background-color: rgba(00, 100, 100, 0.1);
  }
</style>
