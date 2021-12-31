const hitsPrefix = 'hits:'
const hitsKeyFor = (page: string) => `${hitsPrefix}${page}`

export async function getHitsFor(page: string) {
  const hitsAsText = await SITE.get(hitsKeyFor(page), 'text')
  return hitsAsText ? parseInt(hitsAsText) : 0
}

export async function saveHitsFor(page: string, hits: number) {
  await SITE.put(hitsKeyFor(page), hits.toString())
}

export async function deleteHitsFor(page: string) {
  await SITE.delete(hitsKeyFor(page))
}

export type PageHits = {
  path: string
  hits: number
}

export async function getAllPageHits(): Promise<Array<PageHits>> {
  const { keys } = await SITE.list({ prefix: hitsPrefix })

  const pageHits: Array<PageHits> = await Promise.all(
    keys.map(key => getPageHitsFromKey(key.name))
  )

  return pageHits
}

async function getPageHitsFromKey(key: string): Promise<PageHits> {
  const path = key.split(':')[1]
  const hits = await getHitsFor(path)

  return { path, hits }
}
