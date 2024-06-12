vertical

<template>
    <v-list :items="items" style="height: 600px">
      <template #default="{ item, index }">
        <div
          style="border: 1px solid #ccc"
          :style="{ lineHeight: item.lineHeight }"
        >
          ITEM: {{ index }} - {{ item['text'] }}
        </div>
      </template>
    </v-list>
  </template>
  <script>
    import VirtualList from '@virtual-list/vue'
  
    export default {
      components: { 'v-list': VirtualList },
      data() {
        return {
          items: new Array(1000).fill(1).map((v, i) => ({
            text: 'Item ' + i,
            lineHeight: 20 + (i % 20) + 'px',
            width: 100 + (i % 30) + 'px',
          })),
        }
      },
    }
  </script>