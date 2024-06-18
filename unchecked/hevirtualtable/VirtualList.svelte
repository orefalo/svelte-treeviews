<script lang="ts">
	import type { Snippet, SvelteComponent } from 'svelte';
	import { tick } from 'svelte';
	import VirtualListTable from './VirtualListTable.svelte';
	import * as hp from './jshelper';

	let executing = false;
	let waiting = false;

	let listElRef: Element;
	let listInnerRef: Element;

	let prevScroll: number;

	interface Props {
		items: Array<any>;
		disabled?: boolean;
		horizontal?: boolean;
		firstRender?: number;
		buffer?: number;
		itemKey?: 'index' | ((item: any, index: number) => any);
		itemSize?: (item: any, index: number) => number | null | undefined | void;
		table?: boolean;
		prepend?: Snippet;
		row: Snippet<[item: any, i: number]>;
		append?: Snippet;
	}

	let {
		items,
		disabled = false,
		horizontal = false,
		firstRender = 10,
		buffer = 100,
		itemKey = 'index',
		itemSize,
		table = false,
		prepend,
		row,
		append
	}: Props = $props();

	function onscroll() {
		const listEl = listElRef!;
		if (!listEl) {
			return;
		}
		const currentScroll = getScroll(listEl);
		if (prevScroll !== null && buffer - Math.abs(currentScroll - prevScroll) >= 10) {
			return;
		}
		prevScroll = currentScroll;
		update();
	}

	let start = $state(0);
	let end = firstRender - 1;
	const end2 = $derived(hp.notGreaterThan(end, (items?.length || 1) - 1));
	let avgSize = $state(0);
	const runtimeSizes: Array<number> = $derived((items || []).map(() => 0));
	const sizes: Array<number> = $derived.by(() => {
		return (items || []).map((item, index) => {
			if (runtimeSizes && runtimeSizes[index] != null) {
				return runtimeSizes[index];
			}
			let r = itemSize?.(item, index);
			if (r == null) {
				r = avgSize;
			}
			return r;
		});
	});
	const positions: Array<number> = $derived.by(() => {
		const p: number[] = [];
		sizes.reduce((a, b) => {
			p.push(a);
			return a + b;
		}, 0);
		return p;
	});
	const startSize = $derived(positions[start] ? positions[start] : 0);

	const totalSize = $derived(positions.length > 0 ? positions[positions.length - 1] + hp.arrayLast(sizes) : 0);

	const endSize = $derived(positions[end2] ? totalSize - positions[end2] - sizes[end2] : 0);

	const visibleItemsInfo = $derived.by(() => {
		if (!items || disabled) {
			return [];
		}
		const r: { item: (typeof items)[0]; index: number }[] = [];

		for (let index = start; index <= end2; index++) {
			const item = items[index];
			if (!item) {
				break;
			}
			r.push({ item, index });
		}
		return r;
	});

	const listStyle = $derived(!disabled ? "overflow:'auto'" : '');

	function listInnerStyle() {
		const r: { [key: string]: string } = {
			display: 'flex'
		};
		if (!disabled) {
			if (!horizontal) {
				Object.assign(r, {
					'margin-top': startSize + 'px',
					'margin-bottom': endSize + 'px'
				});
			} else {
				Object.assign(r, {
					'margin-left': startSize + 'px',
					'margin-right': endSize + 'px',
					width: totalSize - endSize - startSize + 'px'
				});
			}
		}
		r['flex-direction'] = !horizontal ? 'column' : 'row';
		if (table) {
			// @ts-ignore
			delete r.display;
			delete r['flex-direction'];
		}
		return hp.stylesDictToString(r);
	}

	$effect(() => {
		update();
		try {
			createResizeObserver();
		} catch (error) {
			console.log(error);
			// ResizeObserver fallback
			//tick();
			//update();
		}
	});

	async function update() {
		if (executing) {
			waiting = true;
			return;
		}
		if (!items || disabled) {
			return;
		}
		executing = true;
		const listEl = listElRef!;
		const listInner = listInnerRef;
		if (!listEl || !listInner) {
			return;
		}

		if (!avgSize) {
			avgSize = getAvgSize();
		}

		start = getStart();
		end = getEnd();

		await tick();

		// updateRuntimeSize
		let updated;
		let vi0 = 0;
		const runtimeSizesTemp: Record<number, number> = {};
		const children = !table ? listInner.children : listInner.querySelector('tbody')!.children;
		for (let i = 0; i < children.length; i++) {
			const el = children[i];
			const cssPosition = hp.css(el, 'position');
			if (cssPosition && ['absolute', 'fixed'].includes(cssPosition)) {
				continue;
			}
			const size = hp.css(el, 'display') !== 'none' ? getOuterSize(<HTMLElement>el) : 0;
			const vi = el.getAttribute('vt-index');
			const index = vi ? parseInt(vi) : start + vi0;
			runtimeSizesTemp[index] = (runtimeSizesTemp[index] || 0) + size;
			vi0++;
		}
		for (const indexS of Object.keys(runtimeSizesTemp)) {
			const index = parseInt(indexS);
			if (runtimeSizes[index] !== runtimeSizesTemp[index]) {
				runtimeSizes[index] = runtimeSizesTemp[index];
				updated = true;
			}
		}
		if (updated) {
			await tick();
		}
		// call wating task if existing
		executing = false;
		if (waiting) {
			waiting = false;
			update();
		}

		// functions
		function getStart() {
			const startPosition = getScroll(listEl) - getPaddingStart(listEl) - buffer;
			console.log('startPosition ' + startPosition);
			console.log(positions);
			const r = hp.binarySearch(positions, (mid) => mid - startPosition, {
				returnNearestIfNoHit: true
			})!;
			return r.index;
		}
		function getEnd() {
			const endPosition = getScroll(listEl) - getPaddingStart(listEl) + getClientSize(listEl) + buffer;
			console.log('endPosition ' + endPosition);
			console.log(positions);
			const r = hp.binarySearch(positions, (mid) => mid - endPosition, {
				returnNearestIfNoHit: true
			})!;
			return r.index;
		}
		function getAvgSize() {
			const maxSampleCount = 10;
			const sizeArr: number[] = [];
			const children = !table ? listInner.children : listInner.querySelector('tbody')!.children;
			for (let index = 0; index < children.length; index++) {
				const el = <HTMLElement>children[index];
				const style = getComputedStyle(el);
				if (['absolute', 'fixed'].includes(style.position)) {
					continue;
				}
				const outerSize = getOuterSize(el);
				sizeArr.push(outerSize);
				if (sizeArr.length >= maxSampleCount) {
					break;
				}
			}
			if (sizeArr.length === 0) {
				return 0;
			}
			return sizeArr.reduce((a, b) => a + b, 0) / sizeArr.length;
		}
	}

	function getClientSize(el: Element) {
		const style = getComputedStyle(el);
		let r = parseFloat(!horizontal ? style.height : style.width);
		if (style.boxSizing === 'border-box') {
			if (!horizontal) {
				r -= parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth);
			} else {
				r -= parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
			}
		}
		return r;
	}
	function getOuterSize(el: Element) {
		let r = getClientSize(el);
		const style = getComputedStyle(el);
		if (!horizontal) {
			r +=
				parseFloat(style.borderTopWidth) +
				parseFloat(style.borderBottomWidth) +
				parseFloat(style.marginTop) +
				parseFloat(style.marginBottom);
		} else {
			r +=
				parseFloat(style.borderLeftWidth) +
				parseFloat(style.borderRightWidth) +
				parseFloat(style.marginLeft) +
				parseFloat(style.marginRight);
		}
		r = Number.isNaN(r) ? 0 : r;
		return r;
	}
	function getScroll(el: Element) {
		return !horizontal ? el.scrollTop : el.scrollLeft;
	}
	function getPaddingStart(el: Element) {
		const style = getComputedStyle(el);
		return !horizontal ? parseFloat(style.paddingTop) : parseFloat(style.paddingLeft);
	}

	// whatch
	function createResizeObserver() {
		const listEl = listElRef!;
		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				if (hp.hasClass(entry.target, 'vtlist')) {
					// if tree is resized, update layout
					update();
					break;
				}
			}
		});
		resizeObserver.observe(listEl);
	}

	function getItemKey(item: any, index: number) {
		if (itemKey) {
			if (typeof itemKey === 'string' && itemKey === 'index') {
				return index;
			} else if (typeof itemKey === 'function') {
				return itemKey(item, index);
			}
		}
	}
</script>

<!-- svelte-ignore non_reactive_update -->
<div class="vtlist" bind:this={listElRef} style={listStyle} {onscroll}>
	<VirtualListTable class="vtlist-inner" bind:el={listInnerRef} style={listInnerStyle()} {prepend} {append} {table}>
		{#if disabled}
			{#each items as item, i}
				{@render row(item, i)}
			{/each}
		{:else}
			{#each visibleItemsInfo as item, i}
				{@render row(item.item, i)}
			{/each}
		{/if}
	</VirtualListTable>
</div>
