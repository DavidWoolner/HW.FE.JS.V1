import { type Person } from '@/types/interfaces'
import { type Ref } from 'vue'

export function handleSkills(skills: string | string[] | null) {
  if (typeof skills === 'string') return skills

  return skills ? skills.join(', ') : 'n/a'
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

export function filteredRows(searchString: Ref<string>, data: Ref<Person[]>): Person[] {
  const applyFilters = new ApplyFilters(searchString, new Set())

  for (const row of data) {
    applyFilters.setRow(row)
    for (const element in row) {
      applyFilters.setElement(row[element])
      applyFilters.filter()
    }
  }

  return applyFilters.result()
}

class ApplyFilters {
  private searchString: string
  private set: object
  private rowEle: null | string | string[]
  private row: null | {}

  constructor(searchString: string, set: {}) {
    this.searchString = searchString
    this.set = set
    this.rowEle = null
    this.row = null
  }

  setElement(rowEle: string | string[]) {
    this.rowEle = rowEle
  }

  setRow(row: {}) {
    this.row = row
  }

  filter() {
    if (this.rowAndElementAssigned() && (this.stringCheck() || this.stringArrayCheck())) {
      this.set.add(this.row)
    }
  }

  stringCheck() {
    return typeof this.rowEle === 'string' && this.stringIsSubstring(this.rowEle, this.searchString)
  }

  stringArrayCheck() {
    return Array.isArray(this.rowEle) && this.listContainsMatchStr(this.rowEle, this.searchString)
  }

  rowAndElementAssigned() {
    return this.rowEle && this.row
  }

  stringIsSubstring(targetStr: Ref<string> | string, queryStr: string) {
    return targetStr.toLowerCase().includes(queryStr.toLowerCase())
  }

  listContainsMatchStr(list: string[], searchString: string) {
    return list.some((listItem) => this.stringIsSubstring(listItem, searchString))
  }

  result() {
    return Array.from(this.set)
  }
}

export function removeDuplicateRecords(list: Person[]) {
  const unique: Person[] = []
  const set = new Set()

  list.forEach((item) => {
    if (!set.has(item.id)) {
      unique.push(item)
      set.add(item.id)
    }
  })
  return unique
}
