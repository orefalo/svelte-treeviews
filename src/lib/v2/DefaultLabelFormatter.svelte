<script>
  let { label, isLeafNode } = $props();
</script>

<span class={`clickable ${isLeafNode ? 'isLeafNode' : ''}`}>{label}</span>

<style>
  .isLeafNode {
    padding-left: 1em;
  }
  .clickable {
    cursor: pointer;
  }
</style>
