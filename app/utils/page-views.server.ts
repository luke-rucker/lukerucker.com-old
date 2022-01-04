import { getPageViewsFor, savePageViewsFor } from '~/db/page-views.server'

export function recordPageViewFor(request: Request): Promise<void> {
  return new Promise<void>(resolve => {
    const { pathname } = new URL(request.url)

    getPageViewsFor(pathname)
      .then(previousViews =>
        savePageViewsFor(pathname, previousViews.views + 1).then(resolve)
      )
      .catch(err => {
        console.log('could not record page view', err)
        resolve()
      })
  })
}
