<script lang="ts" setup>
import { useDate } from 'vue3-dayjs-plugin/useDate'
import { ref } from 'vue'
import people from '@/assets/data/people.json'
import Spinner from '../components/Spinner.vue'
import { handleSkills, handleAddress, filteredRows, removeDuplicateRecords } from '@/helpers/table-helpers'
import { fakeFetch, myFetch } from '@/helpers/mock-api-helpers'

const props = defineProps<{
  searchString: string
  page: number
  rowLength: number
  dateFormat: string
}>()

const date = useDate()
const data = ref([])
const isLoading = ref(false)

myFetch(people.response.data, fakeFetch, isLoading, 2000).then((res) => {
  data.value = res
  isLoading.value = false
})
// console.log(props.skillHighlight);


// removeDuplicateRecords(filteredRows(props.searchString, data))

</script>

<template>
  <tbody>
    <tr v-for="{
      id,
      firstName,
      lastName,
      dob,
      skills,
      addressStreet,
      addressCity,
      addressRegion,
      addressPostal,
      addressCountry
    } in removeDuplicateRecords(filteredRows(props.searchString, data)).slice(props.page-2, props.page)" :key="id">
      <td>{{ `${firstName} ${lastName}` }}</td>
      <td>{{ dob.length == 10 ? date(dob).format(props.dateFormat) : 'n/a' }}</td>
      <td>{{ handleSkills(skills) }}</td>
      <td>
        {{ addressStreet }}
        <br v-if="addressStreet" />
        {{ handleAddress(addressCity, addressRegion, addressPostal) }}
        <br v-if="addressCity || addressRegion || addressPostal" />
        {{ addressCountry }}
      </td>
    </tr>
  </tbody>
  <div
    v-if="props.searchString.length > 0 && removeDuplicateRecords(filteredRows(props.searchString, data)).length === 0">
    <p class="no-results">Sorry, there were no results for that search</p>
  </div>
  <Spinner :is-loading="isLoading" />
</template>

<style>
tbody {
  min-width: 1000px;
}

td {
  vertical-align: middle;
}

th {
  font-weight: 800;
}

.no-results {
  position: absolute;
  left: 20rem;
  margin-top: 1rem;
}
</style>
