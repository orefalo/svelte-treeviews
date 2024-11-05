<script lang="ts">
  import { Tree, type TreeLineStyle } from 'svelte-treeviews';
  import data0 from '../themes/materialui/data.json';
  import IndeterminateCheckbox from 'svelte-treeviews/IndeterminateCheckbox.svelte';

  let data = $state(data0);

  let rtl = $state(false);
  let btt = $state(false);
  let scrollable = $state(true);
  let treeLineStyle: TreeLineStyle = $state('orthogonal');
  let treeLineOffset = $state(8);
  let indent = $state(20);

  let listStyle = $derived.by(() => (scrollable ? 'height:500px' : 'height: auto'));
</script>

<h1>Base Tree Example</h1>
<p>
  Right from the start, the tree offers numerous attributes that you can use to personalize and
  adjust how it appears when rendered.
</p>

<hr />
<h4>Properties</h4>
<label>
  Tree line style
  <select bind:value={treeLineStyle}>
    <option value="none">None</option>
    <option value="vertical">Vertical</option>
    <option value="orthogonal">Orthogonal</option>
  </select>
</label>

<br />
<label>
  <input type="checkbox" bind:checked={rtl} />
  rtl (right to left)
</label>
<br />
<label>
  <input type="checkbox" bind:checked={btt} />
  btt (display from bottom to top)
</label>
<br />
<label>
  <input type="checkbox" bind:checked={scrollable} />
  scrollable
</label>
<br />
<div>
  indent
  <input type="number" bind:value={indent} />
</div>
<div>
  treeline offset
  <input type="number" bind:value={treeLineOffset} />
</div>
<hr />

<Tree
  model={data}
  bind:rtl
  bind:indent
  bind:btt
  bind:treeLineStyle
  bind:treeLineOffset
  bind:scrollable
  style={listStyle}>
  {#snippet tree_slot({ data, info })}
    {#if info.children.length}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span onclick={() => info.toggleExpand()}>{info.expended ? '-' : '+'}</span>
    {/if}

    <!-- <IndeterminateCheckbox bind:value={info.checked} onclick={() => info.toggleChecked()} /> -->
    <IndeterminateCheckbox bind:value={info.checked} />

    {data.text}
  {/snippet}
</Tree>
