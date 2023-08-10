<script lang="ts" setup>
import { useDate } from 'vue3-dayjs-plugin/useDate'
import { ref, defineEmits, watchEffect } from 'vue'
import people from '@/assets/people.json'
import { handleSkills, handleAddress } from '@/helpers/table-helpers'
import { HollowDotsSpinner } from 'epic-spinners'



const { searchString} = defineProps<{
  searchString: string
}>()

const date = useDate()
const data = ref([])
// const filtered = ref([])
// const emit = defineEmits(["loading"])
const loading = ref(false)


const fakeFetch = (data, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(data)
    }, delay)
  })
}

// watchEffect(data, () => {
//   emit('loading', loading.value)
// })


const myFetch = async (res) => {
  loading.value = true
  // console.log(loading.value);
  return await fakeFetch(res, 2000)
}

myFetch(people.response.data).then((res) => {
  data.value = res
  loading.value = false
  console.log(loading.value);
})

const filteredRows = (searchString) => {
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
  // noData = filtered.values.length
  return removeDuplicateRecords(filtered.value)
}

const removeDuplicateRecords = (list) => {
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
  <div v-if="loading">
    <hollow-dots-spinner :animation-duration="1000" :dot-size="15" :dots-num="3" color="#297566" class="spinner mt-4"/>
  </div>
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

.spinner {
  margin: 0 auto;
  position: absolute;
  left: 28rem;
}

.no-results {
  position: absolute;
  left: 20rem;
  margin-top: 1rem;
}

@media (max-width: 500px) {
  .spinner {
    left: 9rem;
  }
}
</style>
