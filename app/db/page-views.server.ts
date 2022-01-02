import { cache } from '~/utils/cache.server'

const pageViewsPrefix = 'pageViews:'
const pageViewsKeyFor = (page: string) => `${pageViewsPrefix}${page}`

export type PageViews = {
  path: string
  views: number
}

async function getPageViewsByKey(key: string): Promise<PageViews> {
  const viewsAsText = await SITE.get(key, 'text')
  return {
    path: key.split(':')[1],
    views: viewsAsText ? parseInt(viewsAsText) : 0,
  }
}

export async function getPageViewsFor(page: string): Promise<PageViews> {
  const pageViews = await getPageViewsByKey(pageViewsKeyFor(page))
  return pageViews
}

export async function savePageViewsFor(page: string, views: number) {
  await SITE.put(pageViewsKeyFor(page), views.toString())
}

export async function deletePageViewsFor(page: string) {
  await SITE.delete(pageViewsKeyFor(page))
}

export type CachedPageViews = {
  updatedAt: Date
  pageViews: Array<PageViews>
}

export async function getAllPageViews(): Promise<CachedPageViews> {
  const cacheKey = pageViewsKeyFor('all')

  const cachedTopPageHits = await cache.get<CachedPageViews>(cacheKey)
  if (cachedTopPageHits) return cachedTopPageHits

  const { keys } = await SITE.list({ prefix: pageViewsPrefix })

  const allPageViews: CachedPageViews = {
    updatedAt: new Date(),
    pageViews: await Promise.all(keys.map(key => getPageViewsByKey(key.name))),
  }

  cache.put(cacheKey, allPageViews, { expirationTtl: 60 * 5 })

  return allPageViews
}

export async function getTopPageViews({
  limit,
}: {
  limit: number
}): Promise<CachedPageViews> {
  const cacheKey = `topPageViews:${limit}`

  const cachedTopPageViews = await cache.get<CachedPageViews>(cacheKey)
  if (cachedTopPageViews) return cachedTopPageViews

  const allPageViews = await getAllPageViews()
  const topPageViews: CachedPageViews = {
    updatedAt: new Date(),
    pageViews: allPageViews.pageViews
      .sort((a: PageViews, b: PageViews) => b.views - a.views)
      .slice(0, limit),
  }

  cache.put(cacheKey, topPageViews, { expirationTtl: 60 * 5 })

  return topPageViews
}
