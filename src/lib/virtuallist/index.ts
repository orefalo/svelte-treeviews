// export type VirtualItemSize = ((item: unknown, index: number) => number);

export { default as VirtualList } from './VirtualList.svelte';

export interface VirtualListModel {
  // the actual item value
  item: any;
  // The row's index being rendered, from the original dataset
  // The index is a string if the IDs are processed via the getKey() function
  index: number;
}

export interface VirtualRange {
  // index of the first visible item
  start: number;
  // index of the last visible item
  end: number;
}

export interface VirtualRangeEvent extends VirtualRange {
  type: 'range.update';
}

export interface AfterScrollEvent {
  type: 'scroll.update';
  // either the value of `wrapper.scrollTop` or `wrapper.scrollLeft`
  offset: number | string;
  // the original event
  event: Event;
}

export enum SCROLL_BEHAVIOR {
  AUTO = 'auto',
  SMOOTH = 'smooth',
  INSTANT = 'instant'
}

export enum ALIGNMENT {
  AUTO = 'auto',
  START = 'start',
  CENTER = 'center',
  END = 'end'
}

export enum DIRECTION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

export enum SCROLL_CHANGE_REASON {
  OBSERVED = 0,
  REQUESTED = 1
}
