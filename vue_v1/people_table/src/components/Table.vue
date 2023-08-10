<script lang="ts" setup>
import TableBody from '../components/TableBody.vue'
import grid from '@/assets/data/grid.json'
import { ref, customRef, type Ref } from 'vue'
import { type Column } from '@/types/interfaces'

const searchString: Ref<string> = useDebouncedRef('')
const dynamicColor: Ref<string> = ref('')
const dateFormat: Ref<string> = ref('')

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

function setDynamicColor(col: Column) {
  if (grid.dynamicColor) {
    dynamicColor.value = grid.dynamicColor
  }
}

function setDateFormat(col: Column) {
  if (col.name == 'DOB' && col?.properties?.renderer?.format) {
    dateFormat.value = col?.properties?.renderer?.format
  }
}

grid.columnDefs.forEach(col => {
  setDynamicColor(col)
  setDateFormat(col)
})
</script>

<template>
  <section>
    <h3>{{ grid.title }}</h3>
    <h4>{{ grid.description }}</h4>
    <input v-model="searchString" type="text" placeholder="Search" class="mb-4 form-control" />
    <table :style="{ background: dynamicColor }" className="table table-striped table-hover table-bordered table-sm">
      <thead>
        <tr>
          <th v-for="(col, idx) in grid.columnDefs" :key="idx" scope="col">{{ col.name }}</th>
        </tr>
      </thead>
      <TableBody :search-string="searchString" :date-format="dateFormat" :dynamic-color="dynamicColor"/>
    </table>
  </section>
</template>

<style scoped>
section {
  background-color: white;
  color: black;
  min-width: fit-content;
  max-width: 100rem;
  min-height: 400px;
}

h3,
h4 {
  font-weight: 700;
}

th {
  text-align: center;
}
</style>
