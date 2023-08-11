<script lang="ts" setup>
import { useDate } from 'vue3-dayjs-plugin/useDate'
import { ref, type Ref } from 'vue'
import people from '@/assets/data/people.json'
import Spinner from '../components/Spinner.vue'
import { type Person } from '@/types/interfaces'
import { handleSkills, handleAddress, filteredRows, removeDuplicateRecords } from '@/helpers/table-helpers'
import { fakeFetch, myFetch } from '@/helpers/mock-api-helpers'

const props = defineProps<{
  searchString: Ref<string>
  dateFormat: Ref<string>
  dynamicColor: Ref<string>
}>()

const date = useDate()
const data = ref([])
const isLoading = ref<boolean>(false)

myFetch(people.response.data, fakeFetch, isLoading, 2000).then((res) => {
  data.value = res
  isLoading.value = false
})

const determineData = (searchString: string, data: Person[]) => {
  return searchString.length === 0 ? removeDuplicateRecords(data) : removeDuplicateRecords(filteredRows(searchString, data))
}

const noResults = (searchString: string, data: Person[]) => {
  return searchString.length > 0 && removeDuplicateRecords(filteredRows(searchString, data)).length === 0
}

const handleDOB = (dob, dateFormat) => {
  return dob.length == 10 ? date(dob).format(dateFormat) : 'n/a'
}

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
    } in determineData(searchString, data)" :key="id">
      <td>{{ `${firstName} ${lastName}` }}</td>
      <td>{{ handleDOB(dob, dateFormat)}}</td>
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
    v-if="noResults(searchString, data)">
    <p class="no-results">Sorry, there were no results for that search</p>
  </div>
  <Spinner :dynamic-color="props.dynamicColor" :is-loading="isLoading" />
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
  left: 38vw;
  margin-top: 1rem;
}

@media (max-width: 500px) {
  .no-results {
    left: 2.5rem;
  }
}
</style>
