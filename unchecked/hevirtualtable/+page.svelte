<script lang="ts">
	import VirtualList from './VirtualList.svelte';

	interface MyData {
		text: string;
		lineHeight: string;
		width: string;
	}

	function gen() {
		return new Array(1000).fill(1).map((v, i) => ({
			text: 'Item ' + i,
			lineHeight: 20 + (i % 20) + 'px',
			width: 100 + (i % 30) + 'px'
		}));
	}

	const items: Array<MyData> = gen();
</script>

horizontal

<VirtualList {items} horizontal>
	{#snippet row(item, index)}
		<div style="border: 1px solid #ccc ; width: {item.width}">
			ITEM: {index} - {item.text}
		</div>
	{/snippet}
</VirtualList>
