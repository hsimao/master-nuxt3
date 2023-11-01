import { StorageSerializers } from '@vueuse/core'

export const useFetchWithCache = async <T>(url: string) => {
  const cached = useSessionStorage<T>(url, null, {
    serializer: StorageSerializers.object
  })

  if (cached.value) {
    console.log(`Getting value from cache for ${url}]`)
    return cached
  }

  const { data, error } = await useFetch<T>(url)

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}`
    })
  }

  cached.value = data.value as T

  return cached
}
