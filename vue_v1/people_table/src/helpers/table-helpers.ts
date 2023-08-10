export function handleSkills(skills: string | string[] | null) {
  if (typeof skills === 'string') return skills

  return skills ? skills.join(', ') : 'N/A'
}

export function handleAddress(city: string | null, region: string | null, zip: string | null) {
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
