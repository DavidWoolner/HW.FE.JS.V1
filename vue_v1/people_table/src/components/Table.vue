<script lang='ts' setup>
import TableBody from '../components/TableBody.vue';
import TableHeader from '../components/TableHeader.vue';
import grid from '@/assets/grid.json';
import { ref, customRef } from 'vue'

const searchString = useDebouncedRef('');

function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

</script>

<template>
  <section>
    <h3>{{ grid.title }}</h3>
    <h4>{{ grid.description }}</h4>
    <input v-model="searchString" type="text" placeholder="Search">
    <table className="table table-striped table-hover table-bordered table-sm">
      <TableHeader />
      <TableBody :search-string="searchString" />
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
