<script lang="ts">
  let {
    class: className,
    value = $bindable()
  }: {
    class?: string;
    value: boolean | number;
  } = $props();

  let indeterminate = $derived.by(() => typeof value === 'number' && value > 1);
</script>

<input class={className} type="checkbox" bind:checked={value} {indeterminate} />
