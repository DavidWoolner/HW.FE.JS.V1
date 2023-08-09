<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import grid from '@/assets/grid.json';

// reactive state
console.log(grid);

// functions that mutate state and trigger updates
function createHeader() {

}

// lifecycle hooks
onMounted(() => {
  console.log(`Test`)
})
</script>

<template>
  <thead>
    <tr>
      <th v-for="(col, idx) in grid.columnDefs" :key="idx" scope="col">{{ col.name }}</th>
    </tr>
  </thead>
</template>

<style scoped>

</style>
