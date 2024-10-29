import type { NodeInfo } from './NodeInfo.svelte';

export { default as OpenIcon } from './OpenIcon.svelte';
export { default as IndeterminateCheckbox } from './IndeterminateCheckbox.svelte';
export { default as Tree } from './Tree.svelte';

// class TreeEvent extends Event {}

export type TreeSlotSignature<T> = { data: T; info: NodeInfo<T> };
