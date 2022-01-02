import { getCachedValue } from '~/utils/cache.server'

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

export const getAllPageViews = () =>
  getCachedValue<CachedPageViews>(
    pageViewsKeyFor('all'),
    async () => {
      const { keys } = await SITE.list({ prefix: pageViewsPrefix })

      return {
        updatedAt: new Date(),
        pageViews: await Promise.all(
          keys.map(key => getPageViewsByKey(key.name))
        ),
      }
    },
    { expirationTtl: 60 * 5 }
  )

export const getTopPageViews = ({ limit }: { limit: number }) =>
  getCachedValue<CachedPageViews>(
    `topPageViews:${limit}`,
    async () => {
      const { pageViews } = await getAllPageViews()
      return {
        updatedAt: new Date(),
        pageViews: pageViews
          .sort((a: PageViews, b: PageViews) => b.views - a.views)
          .slice(0, limit),
      }
    },
    { expirationTtl: 60 * 5 }
  )
