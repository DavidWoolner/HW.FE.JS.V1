<script lang="ts" setup>
import { useDate } from 'vue3-dayjs-plugin/useDate'
import { ref, type Ref } from 'vue'
import people from '@/assets/data/people.json'
import Spinner from '../components/Spinner.vue'
import { handleSkills, handleAddress } from '@/helpers/table-helpers'

const { searchString } = defineProps<{
  searchString: string
}>()

const date = useDate()
const data = ref([])
const isLoading = ref(false)

const fakeFetch = (data: Ref, delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(data)
    }, delay)
  })
}

const myFetch = async (res: object[]) => {
  isLoading.value = true
  return await fakeFetch(res, 2000)
}

myFetch(people.response.data).then((res) => {
  data.value = res
  isLoading.value = false
})

function filteredRows(searchString: string) {
  const filtered = new Set()
  if (searchString.length === 0) {
    return removeDuplicateRecords(data)
  }

  for (const row of data.value) {
    for (const item in row) {
      if (typeof row[item] === 'string') {
        if (row[item].toLowerCase().includes(searchString.toLowerCase())) {
          filtered.add(row)
        }
      }
      if (Array.isArray(row[item])) {
        if (
          row[item].filter((listItem) =>
            listItem.toLowerCase().includes(searchString.toLowerCase())
          ).length > 0
        ) {
          filtered.add(row)
        }
      }
    }
  }
  filtered.value = filtered
  return removeDuplicateRecords(filtered.value)
}

const removeDuplicateRecords = (list: Ref) => {
  const set = new Set()
  const unique = []

  list.value.forEach((item) => {
    if (!set.has(item.id)) {
      unique.push(item)
      set.add(item.id)
    }
  })
  return unique
}
</script>

<template>
  <tbody>
    <tr
      v-for="{
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
      } in filteredRows(searchString)"
      :key="id"
    >
      <td>{{ `${firstName} ${lastName}` }}</td>
      <td>{{ dob.length == 10 ? date(dob).format('MMM D') : 'n/a' }}</td>
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
  <div v-if="searchString.length > 0 && filteredRows(searchString).length === 0">
    <p class="no-results">Sorry, there were no results for that search</p>
  </div>
  <Spinner :is-loading="isLoading"/>

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
