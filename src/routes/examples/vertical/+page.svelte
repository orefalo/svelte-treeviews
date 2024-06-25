<script setup lang="ts">
	import Tree from 'svelte-treeviews/Tree.svelte';
	import Refresh from './refresh.svelte';
	import data0 from '../data.json';

	const data = $state(data0);
	const defaultOpen = $state(true);
	const rtl = $state(false);
	const indent = $state(20);
	const btt = $state(false);
	const treeLine = $state(true);
</script>

<template>
	<div>
		<h3>Base Tree</h3>
		<div>
			<h3>Drop</h3>
		</div>
		<hr />
		<h4>Props</h4>
		<label>
			<input type="checkbox" value={defaultOpen} />
			defaultOpen
		</label>
		<label>
			<input type="checkbox" value={rtl} />
			rtl
		</label>
		<br />
		<label>
			<input type="checkbox" value={btt} />
			btt (display from bottom to top)
		</label>
		<br />
		<label>
			<input type="checkbox" value={treeLine} />
			Tree Line
		</label>
		<div>
			indent
			<input type="number" value={indent} />
		</div>
		<hr />
		<!-- <Refresh watch={defaultOpen}> -->
			<Tree modelValue={data} {defaultOpen} {rtl} {indent} {btt} {treeLine} />
		<!-- </Refresh> -->
	</div>
</template>

<style></style>
