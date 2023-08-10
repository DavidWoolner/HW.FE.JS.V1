export const fakeFetch = (data, delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(data)
    }, delay)
  })
}

export const myFetch = async (res: object[], cb, ref) => {
  ref.value = true
  return await cb(res, 2000)
}
