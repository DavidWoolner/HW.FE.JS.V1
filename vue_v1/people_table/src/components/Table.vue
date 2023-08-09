<script lang='ts' setup>
import TableBody from '../components/TableBody.vue';
import TableHeader from '../components/TableHeader.vue';
import grid from '@/assets/grid.json';
import { ref, customRef } from 'vue'

const searchString = useDebouncedRef('');
const noData = ref(0)

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
console.log(noData.value, 'nodata value');

</script>

<template>
  <section>
    <h3>{{ grid.title }}</h3>
    <h4>{{ grid.description }}</h4>
    <input v-model="searchString" type="text" placeholder="Search">
    <table className="table table-striped table-hover table-bordered table-sm">
      <TableHeader />
      <TableBody :search-string="searchString" no-data />
    </table>
  </section>
  <div v-if="searchString.length > 1 && noData === 0">
    <p>Sorry, there were no results for that search</p>
  </div>

  <div v-if="noData == 0">
    <hollow-dots-spinner :animation-duration="1000" :dot-size="15" :dots-num="3" color="#ff1d5e" />
  </div>
</template>

<style scoped>
  section {
    background-color: white;
    color: black;
    min-width: 20rem;
    max-width: 100rem;
  }

  h3, h4 {
    font-weight: 700;
  }
</style>
