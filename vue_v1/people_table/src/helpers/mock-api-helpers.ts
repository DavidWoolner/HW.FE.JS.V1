import { type Person } from '@/types/interfaces'
import { type Ref } from 'vue'

export const fakeFetch = (data: Person[], delay: number): Promise<Person[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(data)
    }, delay)
  })
}

export const myFetch = (
  res: Person[] | unknown[],
  cb: (res: Person[], delay: number) => Promise<Person[] | unknown[]>,
  ref: Ref,
  delay: number
) => {
  ref.value = true
  return cb(res, delay)
}
