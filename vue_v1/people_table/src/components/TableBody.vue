<script lang="ts" setup>
import people from '@/assets/people.json'

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
      } in people.response.data"
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
