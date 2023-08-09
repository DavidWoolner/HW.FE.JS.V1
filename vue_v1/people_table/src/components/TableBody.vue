<script lang="ts" setup>
import { ref, reactive } from 'vue'
import people from '@/assets/people.json'

const {searchString} = defineProps<{
  searchString: string;
}>()

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
  // console.log(people.response.data);
  // const idx = Number(searchString)
  // return people.response.data.slice(0, idx)
  const data = people.response.data
  const filtered = new Set
  // console.log(data);
  if (searchString.length === 0) {
    return data
  }

  for (const row of data) {
    for (const item in row) {
      if (typeof row[item] === 'string') {
        if (row[item].toLowerCase().includes(searchString.toLowerCase())) {
          filtered.add(row);
        }
      }
      if (Array.isArray(row[item])) {
        if (row[item].filter(listItem => listItem.toLowerCase().includes(searchString.toLowerCase())).length > 0) {
          filtered.add(row)
        }
      }
    }
  }

  return filtered;
}

const checkObjectForString = (obj, str) => {

  return Object.values(obj).filter(val => val).join(' ').split(',').join(' ').toLowerCase().includes(str.toLowerCase());
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


</script>

<template>
  <tbody>
    <tr
      v-for="({
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
      }) in filteredRows(searchString)"
      :key="id"
    >
      <td>{{ `${firstName} ${lastName}` }}</td>
      <td>{{ dob || 'n/a' }}</td>
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
