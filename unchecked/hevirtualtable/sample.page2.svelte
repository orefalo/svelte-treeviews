Table
<template>
    <v-list :items="items" table class="list-table" style="height: 600px">
      <template #prepend>
        <thead>
          <tr>
            <th>Text</th>
            <th>Index</th>
          </tr>
        </thead>
      </template>
      <template #default="{ item, index }">
        <tr>
          <td>{{ index }}</td>
          <td>ITEM: {{ index }} - {{ item['text'] }}</td>
        </tr>
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
  <style>
    .list-table table,
    .list-table td,
    .list-table th {
      border: 1px solid #ccc;
    }
    .list-table table {
      border-collapse: collapse;
      width: 100%;
    }
  </style>