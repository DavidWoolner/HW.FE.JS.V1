<script setup>
import TableBody from '../components/TableBody.vue';
import TableHeader from '../components/TableHeader.vue';
import grid from '@/assets/grid.json';
// import { ref, onMounted } from 'vue'

// onMounted(() => {
//   console.log(`Test`)
// })
</script>

<template>
  <section>
    <h3>{{ grid.title }}</h3>
    <h4>{{ grid.description }}</h4>
    <table className="table table-striped table-hover table-bordered table-sm">
      <TableHeader />
      <TableBody />
    </table>
  </section>
</template>

<style scoped>
  section {
    background-color: white;
    color: black;
    min-width: 60vw;
    max-width: 100rem;
  }
</style>
