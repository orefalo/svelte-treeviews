<script lang="ts">
  import ExampleArea from '$comp/ExampleArea.svelte';

  import example from './code.svelte?example';
</script>

<h2>Internal: VirtualList</h2>
<p>
  Tree nodes are layedout in a virtuallist with infinite scrolling
</p>

<ExampleArea {example} />
