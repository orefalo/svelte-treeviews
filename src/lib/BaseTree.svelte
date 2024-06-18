<script lang="ts">
	import { VirtualList } from 'svelte-virtuallists';
	import type { TreeProcessor } from './treeutils';
	import {vueMakeTreeProcessor} from './treeutils'

	let {
		modelValue,
		updateBehavior = 'modify',
		processor=() =>
				vueMakeTreeProcessor([], {
					noInitialization: true
				})
	}: {
		// todo: rename to model
		modelValue: Array<unknown>;
		updateBehavior: 'modify' | 'new' | 'disabled';
		processor:TreeProcessor
	} = $props();
</script>

<VirtualList class="he-tree"></VirtualList>

<style>
	.he-tree--rtl {
		direction: rtl;
	}

	.he-tree-drag-placeholder {
		background: #ddf2f9;
		border: 1px dashed #00d9ff;
		height: 22px;
		width: 100%;
	}
</style>
