<script lang="ts" setup>
import { useDate } from 'vue3-dayjs-plugin/useDate'
import { ref, onMounted } from 'vue'
import { HollowDotsSpinner } from 'epic-spinners'
import people from '@/assets/people.json'

const { searchString, noData } = defineProps<{
  searchString: string
  noData: number
}>()

const date = useDate()
const data = ref([])
const filtered = ref([])

function handleSkills(skills: string | string[] | null) {
  if (typeof skills === 'string') return skills

  return skills ? skills.join(', ') : 'N/A'
}

function handleAddress(city: string | null, region: string | null, zip: string | null) {
  if (city && region && zip) {
    return `${city}, ${region} ${zip}`
  }
  if (!city && region && zip) {
    return `${region} ${zip}`
  }
  if (city && region && !zip) {
    return `${city}, ${region}`
  }
  if (city && !region && zip) {
    return `${city} ${zip}`
  }

  return ''
}

const filteredRows = (searchString) => {
  // console.log(people.response.data)
  // const idx = Number(searchString)
  // return people.response.data.slice(0, idx)
  // const data = people.response.data
  const filtered = new Set()
  // console.log(data);
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

const checkObjectForString = (obj, str) => {
  return Object.values(obj)
    .filter((val) => val)
    .join(' ')
    .split(',')
    .join(' ')
    .toLowerCase()
    .includes(str.toLowerCase())
}

// function filteredRows(searchString: string) {
//   // console.log(people.response.data);
//   //  people.response.data
//   console.log(searchString, 'supposed to be searchstring before this');

//   data.value.filter((row: {})=> Object.keys(row).filter(key => {
//     if (typeof row[key] === 'string') {
//       return row[key].toLowerCase().includes(searchString.toLowerCase())
//     }
//     if (Array.isArray(row[key])) {
//       console.log(row[key].join(' ').toLowerCase().includes(searchString.toLowerCase()));

//       return row[key].join(' ').toLowerCase().includes(searchString.toLowerCase())
//     }
//     if (row[key] === null) {
//       return
//     }

//     return ''
//   }))
// }

const fakeFetch = (data, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(data)
    }, delay)
  })
}
const doFetch = async (res) => {
  return await fakeFetch(res, 5000)
}
doFetch(people.response.data).then((res) => {
  data.value = res
  // noData.value = data.value.length
})

</script>

<template>
  <tbody v-if="filteredRows(searchString).length > 0">
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
</template>

<style>
td {
  vertical-align: middle;
}

th {
  font-weight: 800;
}
</style>
