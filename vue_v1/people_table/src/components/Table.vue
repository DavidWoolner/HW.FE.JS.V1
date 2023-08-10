<script lang="ts" setup>
import TableBody from '../components/TableBody.vue'
import grid from '@/assets/data/grid.json'
import { customRef } from 'vue'

const searchString = useDebouncedRef('')

//Credit to Vue Docs https://vuejs.org/api/reactivity-advanced.html#customref
function useDebouncedRef(value: string, delay = 200) {
  let timeout: number
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
    <input v-model="searchString" type="text" placeholder="Search" class="mb-4 form-control" />
    <table className="table table-striped table-hover table-bordered table-sm">
      <thead>
        <tr>
          <th v-for="(col, idx) in grid.columnDefs" :key="idx" scope="col">{{ col.name }}</th>
        </tr>
      </thead>
      <TableBody :search-string="searchString" />
    </table>
  </section>
</template>

<style scoped>
section {
  background-color: white;
  color: black;
  min-width: fit-content;
  max-width: 100rem;
}

h3,
h4 {
  font-weight: 700;
}

th {
  text-align: center;
}
</style>
