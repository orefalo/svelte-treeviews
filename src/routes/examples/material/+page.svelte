<script lang="ts">
  import { Tree } from 'svelte-treeviews';

  import { NodeInfo } from 'svelte-treeviews/NodeInfo.svelte';

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
    { text: 'Videos' }
  ];
</script>

<Tree
  model={treeModel}
  defaultOpen={true}
  indent={30}
  treeLine={false}
  virtualization={true}
  style="height: 500px">
  {#snippet tree_slot({ data, info }: { data: any; info: NodeInfo })}
    {data.text}
  {/snippet}
</Tree>
