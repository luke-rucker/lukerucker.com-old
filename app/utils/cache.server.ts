const cacheKeyFor = (key: string) => `cache:${key}`

async function get<Value>(key: string): Promise<Value | null> {
  try {
    const value = await SITE.get<Value>(cacheKeyFor(key), 'json')
    console.log(`cache ${value !== null ? 'hit' : 'miss'} for ${key}`)
    return value
  } catch (err) {
    console.log('could not get cache value', err)
    return null
  }
}

async function put<Value>(
  key: string,
  value: Value,
  options?: { expirationTtl?: number }
) {
  try {
    console.log(`caching ${key}`)

    const cacheOptions = options?.expirationTtl
      ? { expirationTtl: options.expirationTtl }
      : undefined

    await SITE.put(cacheKeyFor(key), JSON.stringify(value), cacheOptions)
  } catch (err) {
    console.log('could not store cache value', err)
  }
}

async function remove(key: string) {
  try {
    console.log(`removing ${key} from cache`)
    await SITE.delete(cacheKeyFor(key))
  } catch (err) {
    console.log(`could not remove ${key} from cache`, err)
  }
}

async function removeAll(prefix: string) {
  try {
    const { keys } = await SITE.list({ prefix: cacheKeyFor(prefix) })
    await Promise.all(
      keys.map(
        key =>
          new Promise(resolve => {
            console.log(
              `removing ${key.name.split(':').slice(1).join(':')} from cache`
            )
            SITE.delete(key.name).then(resolve)
          })
      )
    )
  } catch (err) {
    console.log(
      `could not remove all keys from cache matching the prefix ${prefix}`,
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
