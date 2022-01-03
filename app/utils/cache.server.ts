const cachePrefix = 'cache:'
const cacheKeyFor = (key: string) => `${cachePrefix}${key}`
const stripCachePrefix = (key: string) =>
  key.substring(key.indexOf(cachePrefix))

async function get<Value>(key: string): Promise<Value | null> {
  try {
    const value = await SITE.get<Value>(cacheKeyFor(key), 'json')
    console.log(`cache ${value !== null ? 'hit' : 'miss'} for ${key}`)
    return value
  } catch (err) {
    console.log(`could not get cache value for key ${key}`, err)
    return null
  }
}

type CacheOptions = { expirationTtl?: number }

async function put<Value>(key: string, value: Value, options?: CacheOptions) {
  try {
    console.log(`caching ${key}`)

    const cacheOptions = options?.expirationTtl
      ? { expirationTtl: options.expirationTtl }
      : undefined

    await SITE.put(cacheKeyFor(key), JSON.stringify(value), cacheOptions)
  } catch (err) {
    console.log(`could not store cache value for key ${key}`, err)
  }
}

async function remove(key: string) {
  try {
    console.log(`removing ${key} from cache`)
    await SITE.delete(key)
  } catch (err) {
    console.log(`could not remove ${key} from cache`, err)
  }
}

async function removeAll({ matchingPrefix }: { matchingPrefix: string }) {
  try {
    const { keys } = await SITE.list({ prefix: cacheKeyFor(matchingPrefix) })
    await Promise.all(keys.map(key => remove(stripCachePrefix(key.name))))
  } catch (err) {
    console.log(
      `could not remove all keys from cache matching the prefix ${matchingPrefix}`,
      err
    )
  }
}

export const cache = {
  get,
  put,
  remove,
  removeAll,
}

export async function getCachedValue<Value>(
  key: string,
  getValue: () => Promise<Value>,
  options?: CacheOptions
): Promise<Value> {
  const cachedValue = await cache.get<Value>(key)
  if (cachedValue) return cachedValue

  const value = await getValue()

  cache.put(key, value, options)

  return value
}
