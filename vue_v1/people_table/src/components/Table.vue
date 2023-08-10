<script lang="ts" setup>
import TableBody from '../components/TableBody.vue'
import grid from '@/assets/data/grid.json'
import { ref, customRef } from 'vue'

interface Column {
  name: string
  field: string | string[]
  properties: {
    renderer: {
      type: string
      format?: string
      highlight?: string
    }
  }
}

interface Address extends Column {
  properties: {
    renderer: {
      type: string
      address1?: string
      city?: string
      region?: string
      postal?: string
      country?: string
    }
  }
}

interface Grid {
  title: string
  description: string
  columnDefs: Column & Address[]
}

const searchString = useDebouncedRef('')
const page = ref(2)
const rowLength = 0
const dynamicColor = ref('')
const dateFormat = ref('')

const nextPage = () => {
  // if ()
  page.value += 2
}
const prevPage = () => {
  if (page > 0) {
    page.value -= 2
  }
}
console.log(rowLength);


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

function setSkillColor(col: Column) {
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
  setSkillColor(col)
  setDateFormat(col)
})
console.log(dateFormat.value);


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
      <TableBody :search-string="searchString" :page="page" :row-length="rowLength" :date-format="dateFormat"/>
    </table>
  </section>
  <div class="mt-4 text-center">
    <button @click="prevPage" class="btn btn-primary">Prev Page</button>
    <button @click="nextPage" class="btn btn-primary ms-4">Next Page</button>
  </div>
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
