import { getPageViewsFor, savePageViewsFor } from '~/db/page-views.server'

export async function recordPageViewFor(request: Request) {
  try {
    const { pathname } = new URL(request.url)
    const { views: previousViews } = await getPageViewsFor(pathname)
    await savePageViewsFor(pathname, previousViews + 1)
  } catch (err) {
    console.log('could not record page view', err)
  }
}
