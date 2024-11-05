<p align="center"><img src="./static/favicon.svg" alt="Logo" width="225"></p>
<h2 align="center">svelte-treeviews</h2>
<p align="center">A full featured Svelte TreeView component for the rest of us!</p>

<p align="center">
  <a href="https://badgen.net/npm/v/svelte-treeviews"><img src="https://badgen.net/npm/v/svelte-treeviews" alt="NPM VERSION"></a>
  <a href="https://badgen.net/packagephobia/publish/svelte-treeviews"><img src="https://badgen.net/packagephobia/publish/svelte-treeviews" alt="publish size"></a>
  <a href="https://badgen.net/packagephobia/publish/svelte-treeviews"><img src="https://orefalo.github.io/svelte-treeviews/minified-size-badge.svg" alt="minified size"></a>
    <a href="https://orefalo.github.io/svelte-treeviews/minified-size-badge.svg"><img src="https://badgen.net/bundlephobia/dependency-count/svelte-treeviews" alt="deps"></a>
      <a href="https://badgen.net/github/contributors/orefalo/svelte-treeviews"><img src="https://badgen.net/github/contributors/orefalo/svelte-treeviews" alt="contributors"></a>
</p>
<p align="center">
  <a href="#about">About</a> •
  <a href="#features">Features</a> •
  <a href="#usage">Usage</a> •
  <a href="#demos">Demos</a> •
  <a href="#samples">Samples</a>
</p>

![screenshot](./static/screenshot.png)

## About

At last... a full featured tree component for the Svelte eco-system.

This package is a port of the excellent [he-tree](https://github.com/phphe/he-tree), ported from Vuejs 3 to Svelte 5. It took me a long time to adjust to the vuejs syntax, learn svelte 5, port sub-components [svelte-virtuallists](https://github.com/orefalo/svelte-virtuallists) and port the code. Many thanks to the original author, this project would have not made it if the code was not opensourced.

At this point, I can confidently state that Svelte 5 has a natural syntax, breaking away from other frameworks without sacrificing features or performance.

## Features

- ❺❺➎⓹⓹ **Svelte 5+ only**
  Build for Svelte 5+ in Typescript.

- 🚀 **Performant**
  Can render large tree elements, thanks to its optimization with [svelte-virtuallists](https://github.com/orefalo/svelte-virtuallists).

- 🛠 **Configurable**
  Headless, themeable, unobtrusive, easily adjustable, with built-in styling and behavioral parameters.
  
- 💠 **Advanced Features**
  Headless, Drag and drop, Key controls, Tree and tabular shaped data,  Checkboxes, Indetermined state, Right to left...etc.

- 🧩 **Programming Interface**
  Powerful API and events to integrate in all your projects.

- 💼 **Small**
  Compact, one dependency – Only ~7kb when compressed.


## Browser Support

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Latest ✔                                                                                | Latest ✔                                                                                   | Latest ✔                                                                                | Latest ✔                                                                             | Latest ✔                                                                          | 11 ✔                                                                                                                        |

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=orefalo/svelte-treeviews&type=Date)](https://star-history.com/#orefalo/svelte-treeviews&Date)

# Installation

`npm i svelte-treeviews`

## Examples

- [Demos](https://orefalo.github.io/svelte-treeviews/)

## Samples

```svelte
<script>
	import { Tree } from 'svelte-treeviews';

	const data = [{text:'A'},{ text:'B'}, { text:'C', children: [{ text:'C1'},{ text:'C2'},{ text:'C3'}]} ];
</script>

<Tree class='mystyle' style='width:100%;height=600px' model={data}>
</Tree>
```

### Props

The component accepts the following properties

| Property          | Type        | Required? | Description  |
| ----------------- | ----------- | :-------: | ------------ |
| model | `NodeData[]` | ✓ | the model, the data for the items to display in the list. |
| updateBehavior                 | `modify` or `new` or `disabled` (modify) |           |                                                              |
| indent                         | number (20)                              |           | Node indent in pixels |
| scrollable      | boolean (false)                          |           | is the tree rendered as part of a scrollable viewport |
| scrollablePrerenderCount | number (20)                              |           | Used for SSR, when scrollable is active: how many records to pre-render |
| defaultOpen                  | boolean (false) |           | When true, the tree displays as fully open, at all levels. |
| rtl                          | boolean (system default)                 |           | Right to Left rendering                                      |
| btt                          | boolean (false)                          |           | Bottom to top rendering inverses the tree upside down        |
| treeLineStyle        | `none` or `singleline` or `orthogonal` (none) |           | Render tree lines that connect each node of the tree with different styles. |
| treeLineOffset | number (8) | | Horizontal displacement of tree lines in pixels |
| class                          | string |           | Any css class to apply on the tree                           |
| style                          | string |           | Any css styles to apply on the tree                          |

* `NodeData` is a generic type

### Snippets

| Property    | attributes                                     | Required? | Description                                                  |
| ----------- | ---------------------------------------------- | :-------: | ------------------------------------------------------------ |
| tree_slot   | { data: NodeData, info: NodeInfo, tree: Tree } |     ✓     | Snippet called to render every visible item of the model     |
| treeLine    | { data: NodeData, info: NodeInfo, tree: Tree } |           | Snippet which can be used to customize how tree lines are rendered |
| placeholder | { tree: Tree}                                  |           | Snippet which can be used to customize the drop placeholder UI |

### Events

Tree state events

| Property       | Type              | Description                                                  |
| -------------- | ----------------- | ------------------------------------------------------------ |
| onNodeChecked  | `(NodeInfo):void` | Triggered when a node is checked                             |
| onNodeSelected | `(NodeInfo):void` | Triggered when a node is selected                            |
| onNodeOpened   | `(NodeInfo):void` | Triggered when a grouping node is opened                     |
| onNodeClosed   | `(NodeInfo):void` | Triggered when a grouping node is closed                     |
| onUpdateValue  | `(NodeInfo):void` | Triggered when node value changes, or batch update completed - behavioe depends up updateBehavior |

Positioning events

| Property             | Type                         | Description                                                  |
| -------------------- | ---------------------------- | ------------------------------------------------------------ |
| onAfterScroll        | `{offset:number, event}`     | When *scrollable* is used, fires when the scrollbar changes position. |
| onVisibleRangeUpdate | `{start:number, end:number}` | When *scrollable* is used, fires when the visible window is sliding to display new items. `start` and `end` are expressed as model indexes. |

Drag&Drop events

| Property          | Type      | Description                                                  |
| ----------------- | --------- | ------------------------------------------------------------ |
| onBeforeDragStart | dragNode  | Triggered before drag start                                  |
| onAfterDrop       |           | Triggered after drop. Only triggered on dropped tree         |
| onDropChange      |           | Triggered after changed by drop. Triggered on both 2 trees when drag cross trees |
| onDragEnter       | DragEvent | Triggered when drag enter a tree                             |
| onDragLeave       | DragEvent | Triggered when drag leave a tree                             |

### APIs

| API Function | Type | Description |
| ------------ | ---- | ----------- |
| add          | `(nodeData:NodeData, parent: NodeInfo|undefined, index?: number): void` |Add node. if parent is undefined, it's the root of the tree.|
| addMulti | `(dataArr: any[], parent?: NodeInfo,   startIndex?: number \| null ): void` |Add multiple continuously nodes. parent is null means roo|
| batchUpdate | `(task: () => any): void` |Merge multiple data updates, events are only riased once|
| closeAll | `(): void` |Close all nodes.|
| getChecked | (withDemi?: boolean): NodeInfo[] |Get all checked nodes. Param `withDemi` means including half checked|
| getData | (filter?: ((data: never) => never), root?: NodeInfo): NodeData[]; |Generate and get current data without stat. Param `filter` can handle each node data|
| getSiblings | (node: NodeInfo): NodeInfo[]; |Get all siblings of a node including it self.|
| getNodeInfo | (node:NodeData): NodeInfo |Get `stat` by node data.|
| getUnchecked | (withDemi?: boolean): NodeInfo[] |Get all unchecked nodes. Param `withDemi` means including half checked.|
| has | (nodeData: unknown): boolean |Detect the tree if has the stat of given node data.|
| isVisible | (node: NodeInfo \|NodeData): boolean |Detect if node is visible. When parent invisible or closed, children are invisible. The parameter can n be a nodeInfo or a nodeData.|
| iterateParent | (node: NodeInfo, opt?: {  withSelf: boolean }): Generator<NodeInfo> |Iterate all parents of a node. Param `opt.withSelf` means including it self|
| move | (node:NodeInfo, parent?: NodeInfo, index: number): boolean |Move node. parent is null means root. Similar to `add`, check the example of `add`|
| openAll | (): void |Open all nodes|
| openNodeAndParents | (node: NodeData \| NodeInfo): void |Open a node and its all parents to make it visible. The argument `nodeDataOrInfo` can be node data or node info|
| remove | (node:NodeInfo): boolean |Remove node.|
| removeMulti | (dataArr: any[]): boolean |Remove multiple nodes, ensure only one change event is raised|
| updateCheck | (): void |Recalculate `checked` state of all nodes from end to root.|

### Structures

***NodeData***

NodeData is a generic type representing the custom user data of each node.  NodeData[] is typically given as the `model` amd processes as items in snippets or events 

***NodeInfo***

NodeInfo is a superset of NodeData. It stores the metadata used by the tree to render and process the tree structure properly.

```javascript
interface NodeInfo<T> {

  // user data
  data: T;
  // pointer to parent node, undefined for top node
  parent?: NodeInfo<T>;
  // list of children, grouping nodes will have children.length > 0
  children: NodeInfo<T>[];
  // is the node open?
  expended: boolean;
  // depth, 0 is top level
  level: number = 0;
  // is the node hidden?
  hidden: boolean;
  // is the checkbox active? 0 means indetermined
  checked: boolean | 0;
  // is the node draggable? undefined means inherit parent
  draggable?: boolean;
  // is the node droppable? undefined means inherit parent
  droppable?: boolean;
  // any style to apply to this node, undefined means inherit parent
  style?: string;
  // any class to apply to this node, undefined means inherit parent
  class?: string;
}
```

***DragContext***

DragContext provides the context is which a drag&drop action is run.

***StartInfo***

```javascript
{
  tree: DraggableTreeType; // Draggable component instance.
  dragNode: NodeInfo<T>; // The dragging node.
  parent: NodeInfo<T> | null; // Parent of dragging node.
  siblings: NodeInfo<T>[]; // Siblings of dragging node.
  indexBeforeDrop: number; // Index of dragging node before drop.
}
```

## Contributing

Please read [CODE OF CONDUCT](CODE_OF_CONDUCT.md) and the [CONTRIBUTION](CONTRIBUTING.md) guide for more details.
