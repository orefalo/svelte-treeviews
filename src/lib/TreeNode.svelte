<script lang="ts">
	import type { Stat } from './treeutils';

	let vLines = [
		// Your array of line objects with "style" properties
	];

	let stat: Stat<Object>;
	// right or left layout
	let rtl: boolean = false;
	// bottomOrTop
	let btt: boolean = false;

	let treeLine: boolean = true;

	// indentation
	let indent: number = 20;

	let treeLineOffset: number = 10;

	$: indentStyle = computeInlineStyle($rtl, $indent, $stat);

	$: hLineStyle = computeHLineStyle($rtl, $indent, $stat, $treeLineOffset);

	function computeHLineStyle(rtl, indent, stat, treeLineOffset) {
		const pos = (stat.level - 2) * indent + treeLineOffset;
		const leftOrRight = rtl ? 'right' : 'left';
		return leftOrRight + ':' + pos + 'px';
	}

	function computeInlineStyle(rtl, indent, stat) {
		return (!rtl ? 'paddingLeft:' : 'paddingRight:') + indent * (stat.level - 1) + 'px';
	}

	function hasNextVisibleNode(node) {
		if (!node || !node.parent) return false;
		const siblings = node.parent.children;
		const index = siblings.indexOf(node);
		return index < siblings.length - 1;
	}

	$: vLines = (() => {
		const lines = [];
		const leftOrRight = rtl ? 'right' : 'left';
		const bottomOrTop = btt ? 'top' : 'bottom';
		let current = stat;

		while (current) {
			let left = (current.level - 2) * indent + treeLineOffset;
			const hasNext = hasNextVisibleNode(current);
			const addLine = () => {
				lines.push({
					style: {
						[leftOrRight]: left + 'px',
						[bottomOrTop]: hasNext ? 0 : '50%'
					}
				});
			};
			if (current === stat) {
				if (current.level > 1) {
					addLine();
				}
			} else if (hasNext) {
				addLine();
			}
			current = current.parent;
		}
		return lines;
	})();
</script>

<div class="tree-node tree-node--with-tree-line" style={indentStyle}>
	{#if treeLine}
		{#each vLines as { style }}
			<div class="tree-line tree-vline" {style} />
			{#if stat.level > 1}
				<div class="tree-line tree-hline" style={hLineStyle} />
			{/if}
		{/each}
	{/if}
	<div class="tree-node-inner">
		<slot style={indentStyle} />
	</div>
</div>
