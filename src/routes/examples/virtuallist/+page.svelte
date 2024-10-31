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

<h2>Virtual List</h2>
<p>
  Virtualization ensures that tree rendering is both highly efficient and rapid by focusing on the
  optimization of only those items that are visible on the screen.
</p>

<Tree
  model={treeModel}
  defaultOpen={true}
  indent={30}
  treeLine={false}
  virtualization={true}
  style="height: 500px">
  {#snippet tree_slot({ data, info })}
    {data.text}
  {/snippet}
</Tree>
