const cachePrefix = 'cache:'
const cacheKeyFor = (key: string) => `${cachePrefix}${key}`
const stripCachePrefix = (key: string) =>
  key.substring(key.indexOf(cachePrefix))

function get<Value>(key: string): Promise<Value | null> {
  return new Promise<Value | null>(resolve => {
    SITE.get<Value>(cacheKeyFor(key), 'json')
      .then(value => {
        console.log(`cache ${value !== null ? 'hit' : 'miss'} for ${key}`)
        resolve(value)
      })
      .catch(err => {
        console.log(`could not get cache value for key ${key}`, err)
        resolve(null)
      })
  })
}

type CacheOptions = { expirationTtl?: number }

function put<Value>(
  key: string,
  value: Value,
  options?: CacheOptions
): Promise<void> {
  return new Promise<void>(resolve => {
    console.log(`caching ${key}`)

    const cacheOptions = options?.expirationTtl
      ? { expirationTtl: options.expirationTtl }
      : undefined

    SITE.put(cacheKeyFor(key), JSON.stringify(value), cacheOptions)
      .then(resolve)
      .catch(err => {
        console.log(`could not store cache value for key ${key}`, err)
        resolve()
      })
  })
}

function remove(key: string): Promise<void> {
  return new Promise<void>(resolve => {
    console.log(`removing ${key} from cache`)

    SITE.delete(key)
      .then(resolve)
      .catch(err => {
        console.log(`could not remove ${key} from cache`, err)
        resolve()
      })
  })
}

function removeAll({
  matchingPrefix,
}: {
  matchingPrefix: string
}): Promise<void> {
  return new Promise<void>(resolve => {
    SITE.list({ prefix: cacheKeyFor(matchingPrefix) })
      .then(({ keys }) =>
        Promise.all(
          keys.map(key => {
            const keyToRemove = stripCachePrefix(key.name)
            return remove(keyToRemove)
          })
        ).then(() => resolve())
      )
      .catch(err => {
        console.log(
          `could not remove all keys from cache matching the prefix ${matchingPrefix}`,
          err
        )
        resolve()
      })
  })
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
