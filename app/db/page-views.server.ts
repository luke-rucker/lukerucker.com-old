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

export async function getAllPageViews(): Promise<Array<PageViews>> {
  const { keys } = await SITE.list({ prefix: pageViewsPrefix })

  const allPageViews: Array<PageViews> = await Promise.all(
    keys.map(key => getPageViewsByKey(key.name))
  )

  return allPageViews
}

export type TopPageViews = {
  updatedAt: Date
  pageViews: Array<PageViews>
}

const topPageViewsKeyFor = (limit: number) => `topPageViews:${limit}`

export async function getTopPagehits({
  limit,
}: {
  limit: number
}): Promise<TopPageViews> {
  const cacheKey = topPageViewsKeyFor(limit)

  const cachedTopPageHits = await SITE.get<TopPageViews>(cacheKey, 'json')

  if (cachedTopPageHits) return cachedTopPageHits

  const allPageViews = await getAllPageViews()

  const topPageViews: TopPageViews = {
    updatedAt: new Date(),
    pageViews: allPageViews
      .sort((a: PageViews, b: PageViews) => b.views - a.views)
      .slice(0, limit),
  }

  await SITE.put(cacheKey, JSON.stringify(topPageViews), {
    expirationTtl: 60 * 5,
  })

  return topPageViews
}
