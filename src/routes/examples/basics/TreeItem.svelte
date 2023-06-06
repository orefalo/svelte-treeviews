<script lang="ts">
	export let controlChecked = false;
	export let props;
</script>

<div>
	<div class="wrapper">
		<label>TreeItem Component</label>
		<input type="checkbox" checked={controlChecked} />
	</div>
</div>

<style>
	.wrapper {
		display: flex;
	}
	input[type='checkbox'] {
		align-self: flex-end;
	}
	label {
		color: rgb(25, 0, 255);
	}
</style>
