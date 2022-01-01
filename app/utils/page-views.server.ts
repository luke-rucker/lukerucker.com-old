import { getPageViewsFor, savePageViewsFor } from '~/db/page-views.server'

export async function recordPageViewFor(request: Request) {
  const { pathname } = new URL(request.url)
  const { views: previousViews } = await getPageViewsFor(pathname)
  await savePageViewsFor(pathname, previousViews + 1)
  return null
}
