<script lang="ts">
  let {
    class: className,
    value = $bindable()
  }: {
    class?: string;
    // 0 is used for the intermediate state
    value: boolean | 0;
  } = $props();

  let indeterminate = $derived.by(() => value === 0);
</script>

<input class={className} type="checkbox" bind:checked={value} {indeterminate} />
