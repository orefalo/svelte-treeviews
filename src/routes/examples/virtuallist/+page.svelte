<script lang="ts">
  import { Tree } from 'svelte-treeviews';

  const treeModel = [
    {
      text: 'Projects',
      children: [
        {
          text: 'Frontend',
          children: [
            {
              text: 'Vue',
              children: [
                {
                  text: 'Nuxt'
                }
              ]
            },
            {
              text: 'React',
              children: [
                {
                  text: 'Next'
                }
              ]
            },
            {
              text: 'Angular'
            }
          ]
        },
        {
          text: 'Backend'
        }
      ]
    },
    { text: 'Photos' },
    { text: 'Videos' },
    ...new Array(1000).fill(1).map(v => ({
      text: 'Node-' + Math.random().toString().substring(2, 5)
    }))
  ];
</script>

<h2>Large Scrollable Trees</h2>
<p>
  Scrollable ensures that tree rendering is both highly efficient and responsive by focusing on the
  optimization of those items that are only visible on the screen.
</p>
<p>The setting is ON by default and plays nicely with <b>height: auto</b> and <b>height: 500px</b> CSS styles</p>

<Tree
  model={treeModel}
  defaultOpen={true}
  indent={30}
  treeLineStyle="none"
  scrollable={true}
  style="height: 500px">
  {#snippet tree_slot({ data })}
    {data.text}
  {/snippet}
</Tree>
