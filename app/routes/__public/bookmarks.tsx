import type { LoaderFunction, MetaFunction } from 'remix'
import { useLoaderData } from 'remix'
import { Alert } from '~/components/alert'
import { Anchor } from '~/components/anchor'
import { Link } from '~/components/link'
import { PageHeading } from '~/components/page-heading'
import type { Bookmark } from '~/db/bookmarks.server'
import { getBookmarks } from '~/db/bookmarks.server'
import type { Handle } from '~/types'
import { recordPageViewFor } from '~/utils/page-views.server'

export const handle: Handle = {
  adminToolbar: () => <Link to="/admin/bookmarks">edit bookmarks</Link>,
}

export const meta: MetaFunction = () => ({
  title: 'Bookmarks | Luke Rucker',
})

export const loader: LoaderFunction = async ({ request }) => {
  recordPageViewFor(request)
  const bookmarks = await getBookmarks()
  return bookmarks
}

export default function Bookmarks() {
  const bookmarks = useLoaderData<Array<Bookmark>>()

  return (
    <>
      <PageHeading header="Bookmarks">
        Some articles, tweets, links, etc. I&apos;ve found useful, intriguing,
        or otherwise noteworthy. Inspired by Sergio Xalambrí&apos;s{' '}
        <Anchor
          href="https://sergiodxa.com/bookmarks"
          className="text-gray-800"
          aria-label="Sergio Xalambrí's Bookmarks Page"
        >
          bookmarks
        </Anchor>{' '}
        page.
      </PageHeading>

      {bookmarks.length > 0 ? (
        <ol className="space-y-8">
          {bookmarks.map(bookmark => (
            <li key={bookmark.id}>
              <Anchor
                href={bookmark.url}
                className="text-2xl font-semibold text-gray-800"
              >
                <h3 className="mb-4">{bookmark.title}</h3>
              </Anchor>
              <p className="text-gray-600">{bookmark.url}</p>
            </li>
          ))}
        </ol>
      ) : (
        <Alert>No bookmarks yet!</Alert>
      )}
    </>
  )
}
