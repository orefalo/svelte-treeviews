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



## Features

- ❺❺➎⓹⓹ **Svelte 5+ only**
  Build for Svelte 5+ in Typescript.

- 🚀 **Performant**
  Render millions of items, without breaking a sweat.

- 🛠 **Configurable**
  Customize width, heigh, position, style, content.
  
- 💠 **Layout Control**
  Headless, support fixed and variables sizing, along with vertical and horizontal lists and tables.

- 🧩 **Programming Interface**
  Set positions and properties, raises events on state mutation.

- 💼 **Small**
  Compact and dependency free – Only ~5kb when compressed.

## Usage

This component can be used two different ways:

- 🤖 As a scrollable listover a large number of items, optionally read incrementally.

- 🧠 As a fondation for more complex components - TreeViews and DataGrids.

## Browser Support

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Latest ✔                                                                                | Latest ✔                                                                                   | Latest ✔                                                                                | Latest ✔                                                                             | Latest ✔                                                                          | 11 ✔                                                                                                                        |

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=orefalo/svelte-treeviews&type=Date)](https://star-history.com/#orefalo/svelte-treeviews&Date)

## Examples

- [Demos](https://orefalo.github.io/svelte-treeviews/)

## Samples

```svelte
<script>
	import { VirtualList } from 'svelte-treeviews';

	const data = ['A', 'B', 'C', 'D', 'E', 'F' /* ... */];
</script>

<VirtualList class='mystyle' style='width:100%;height=600px' items={data}>
	{#snippet vl_slot({ index, item })}
		<div>
			Row: #{index} Item: {item}
		</div>
	{/snippet}
</VirtualList>
```

### Props

The component accepts the following properties

| Property          | Type        | Required? | Description  |
| ----------------- | ----------- | :-------: | ------------ |
| model | `any[]` | ✓ | the model, the data for the items to display in the list. |
| updateBehavior                 | `modify` or `new` or `disabled` (modify) |           |                                                              |
| indent                         | number                                   |           |                                                              |
| virtualization               | boolean (false)                          |           | is the tree rendered as part of a scrolling viewport         |
| virtualizationPrerenderCount | number (20)                              |           | mainly used for SSR, when virtualization is active, how many records to pre render |
| defaultOpen                  | boolean (false) |           | When true, the tree displays as fully open, at all levels. |
| rtl                          | boolean (system default)                 |           | Right to Left rendering                                      |
| btt                          | boolean (false)                          |           | Bottom to top rendering inverses the tree upside down        |
| treeLine                     | boolean (false)                          |           |                                                              |
| class                          | string |           | Any css class to apply on the tree                           |
| style                          | string |           | Any css styles to apply on the tree                          |

### Snippets

| Property    | Type                                                | Required? | Description                                                 |
| ----------- | --------------------------------------------------- | :-------: | ----------------------------------------------------------- |
| tree_slot   | Function([{ *data*: *NodeData*; *info*: NodeInfo }] |     ✓     | Snippet called to render every item of the model.           |
| placeholder | {}                                                  |           | Snipper called to render the drag and drop placeholder area |

For instance,

```svelte

```

### Events

| Property             | Type                         | Description                                                  |
| -------------------- | ---------------------------- | ------------------------------------------------------------ |
| onNodeChecked        | `(e: NodeInfo) => void`      | Triggered when a node is checked                             |
| onNodeSelected       | `(e: NodeInfo) => void`      | Triggered when a node is selected                            |
| onNodeOpened         | `(e: NodeInfo) => void`      | Triggered when a grouping node is opened                     |
| onNodeClosed         | `(e: NodeInfo) => void`      | Triggered when a grouping node is closed                     |
| onUpdateValue        | `(e: NodeInfo) => void`      | Triggered when node value changes, or batch update completed - behavioe depends up updateBehavior |
| onAfterScroll        | `{offset:number, event}`     | When *virtualization* is used, fires when the scrollbar changes position. |
| onVisibleRangeUpdate | `{start:number, end:number}` | When *virtualization* is used, fires when the visible window is sliding to display new items |

## Contributing

Please read [CODE OF CONDUCT](CODE_OF_CONDUCT.md) and the [CONTRIBUTION](CONTRIBUTING.md) guide for more details.
