import  { type Person }  from '@/types/interfaces'

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

export function filteredRows(searchString: string, data: Person[]) {
  const filtered = new Set()

  if (searchString.length === 0) {
    return data
  }

  for (const row of data) {
    for (const element in row) {
      const rowEle = row[element]
      if (typeof rowEle === 'string' && stringIsSubstring(rowEle, searchString)) {
        filtered.add(row)
      }
      if (Array.isArray(rowEle) && listContainsMatchStr(rowEle, searchString)) {
        filtered.add(row)
      }
    }
  }

  return Array.from(filtered)
}

function stringIsSubstring(targetStr: string, queryStr: string) {
  return targetStr.toLowerCase().includes(queryStr.toLowerCase())
}

function listContainsMatchStr(list: string[], searchString: string) {
  return list.some( listItem => stringIsSubstring(listItem, searchString))
}

export function removeDuplicateRecords(list: Person[]) {
  const unique: Person[] = []
  const set    = new Set()

  list.forEach((item) => {
    if (!set.has(item.id)) {
      unique.push(item)
      set.add(item.id)
    }
  })
  return unique
}
