<script setup lang="ts">
import Table from './components/Table.vue'
</script>

<template>
  <main>
    <Table />
  </main>
</template>

<style scoped>
main {
  min-height: 600px;
  min-width: 80vw;
}

@media (max-width: 500px) {
  main {
    min-width: 100%;
  }
}
</style>
