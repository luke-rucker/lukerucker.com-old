import { getHitsFor, saveHitsFor } from '~/db/hits.server'

export async function recordHitFor(request: Request) {
  const { pathname } = new URL(request.url)
  const previousHits = await getHitsFor(pathname)
  await saveHitsFor(pathname, previousHits + 1)
  return null
}
