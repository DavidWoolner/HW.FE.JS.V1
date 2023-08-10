<script lang='ts' setup>
import TableBody from '../components/TableBody.vue';
import TableHeader from '../components/TableHeader.vue';
import { HollowDotsSpinner } from 'epic-spinners'
import grid from '@/assets/grid.json';
import { ref, customRef } from 'vue'

const searchString = useDebouncedRef('');
const showLoading = ref(false)
const mess = ref('')

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
    <input v-model="searchString" type="text" placeholder="Search" class="mb-4 form-control">
    <table className="table table-striped table-hover table-bordered table-sm">
      <TableHeader />
      <TableBody :search-string="searchString" @loading="(val) => showLoading = val"/>
    </table>
  </section>
  <!-- <div v-if="!isLoading">
    <hollow-dots-spinner :animation-duration="1000" :dot-size="15" :dots-num="3" color="#ff1d5e" />
  </div> -->
</template>

<style scoped>
  section {
    background-color: white;
    color: black;
    min-width: fit-content;
    max-width: 100rem;
  }

  h3, h4 {
    font-weight: 700;
  }

  * {
    color: black;
  }
</style>
