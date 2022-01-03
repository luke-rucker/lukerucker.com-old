import { z } from 'zod'
import { cache, getCachedValue } from '~/utils/cache.server'
import { md5 } from '~/utils/hashes.server'

export const bookmarkSchema = z.object({
  title: z.string().nonempty({ message: 'A title is required.' }),
  url: z.string().nonempty({ message: 'A url is required.' }),
})

export type BookmarkSchema = z.infer<typeof bookmarkSchema>

// Attributes which are not filled automatically by the server (and not editable by the user)
type AdditionalBookmarkAttributes = {
  id: string
}

export type Bookmark = BookmarkSchema & AdditionalBookmarkAttributes

const bookmarksPrefix = 'bookmarks:'
const bookmarksKeyFor = (id: string) => `${bookmarksPrefix}${id}`

async function getBookmarkByKey(key: string): Promise<Bookmark | null> {
  const bookmark = await SITE.get<BookmarkSchema>(key, 'json')
  return bookmark ? { ...bookmark, id: key.split(':')[1] } : null
}

export const getBookmarks = () =>
  getCachedValue<Array<Bookmark>>(bookmarksKeyFor('all'), async () => {
    const { keys } = await SITE.list({ prefix: bookmarksPrefix })

    const potentiallyNullBookmarks = await Promise.all(
      keys.map(key => getBookmarkByKey(key.name))
    )

    const bookmarks = potentiallyNullBookmarks.filter(
      Boolean
    ) as Array<Bookmark>

    return bookmarks.sort((a: Bookmark, b: Bookmark) =>
      a.title.localeCompare(b.title)
    )
  })

async function refreshBookmarkCache() {
  console.log('refreshing bookmarks cache')
  await cache.removeAll({ matchingPrefix: bookmarksPrefix })
  await getBookmarks()
}

export async function saveBookmark(bookmark: BookmarkSchema) {
  const bookmarkToSave: Bookmark = {
    ...bookmark,
    id: await md5(bookmark.url),
  }

  await SITE.put(
    bookmarksKeyFor(bookmarkToSave.id),
    JSON.stringify(bookmarkToSave)
  )

  await refreshBookmarkCache()
}
