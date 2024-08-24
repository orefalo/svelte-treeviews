<script>
  import TreeView from './TreeView.svelte';

  let treeItems = {
    label: 'Yummy',
    children: [
      {
        label: 'Diary products',
        expanded: false,
        children: [{ label: 'Cheese' }, { label: 'Yogurt' }]
      },
      {
        label: 'Fruit',
        expanded: true,
        children: [
          { label: 'Apple' },
          { label: 'Banana' },
          { label: 'Peach' },
          {
            label: 'Nuts',
            children: [{ label: 'Cashew' }, { label: 'Peanut' }, { label: 'Almond' }]
          }
        ]
      },
      {
        label: 'Vegetables',
        expanded: true,
        children: [
          { label: 'Eggplant' },
          { label: 'Pepper' },
          { label: 'Broccoli' },
          { label: 'Mushroom' },
          { label: 'Cauliflower' }
        ]
      }
    ]
  };

  const options = {
    // labelFormatter: () => import('../src/views/ExampleFormatter.svelte')
  };
</script>

<TreeView {treeItems} {options}></TreeView>

<!-- 
export const Basic = () => ({
  Component: TreeView,
  props: {
    treeItems: treeItems
  },
  on: {
    modelChanged: newOrder => {
      treeItems = newOrder;
    }
  }
});

export const CustomLabels = () => ({
  Component: TreeView,
  props: {
    treeItems: treeItems,
    options: {
      labelFormatter: () => import('../src/views/ExampleFormatter.svelte')
    }
  },
  on: {
    modelChanged: newOrder => {
      treeItems = newOrder;
    }
  }
});

export const CustomClasses = () => ({
  Component: TreeView,
  props: {
    treeItems: treeItems,
    options: {
      collapseClass: 'fa fa-folder-open',
      expandClass: 'fa fa-folder',
      labelFormatter: () => import('../src/views/ExampleFormatter.svelte')
    }
  },
  on: {
    modelChanged: newOrder => {
      treeItems = newOrder;
    }
  }
}); -->
