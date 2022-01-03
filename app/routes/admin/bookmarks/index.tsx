import type { LoaderFunction, MetaFunction } from 'remix'
import { Form, useLoaderData } from 'remix'
import { Alert } from '~/components/alert'
import { Anchor } from '~/components/anchor'
import { Card } from '~/components/card'
import { HeaderSection } from '~/components/header-section'
import { Link } from '~/components/link'
import type { Bookmark } from '~/db/bookmarks.server'
import { getBookmarks } from '~/db/bookmarks.server'

export const meta: MetaFunction = () => ({
  title: 'Bookmarks | Luke Rucker',
})

export const loader: LoaderFunction = () => getBookmarks()

export default function Bookmarks() {
  const bookmarks = useLoaderData<Array<Bookmark>>()

  return (
    <>
      <HeaderSection
        text="Bookmarks"
        right={
          <Link to="new" className="text-xl">
            New
          </Link>
        }
      />

      {bookmarks.length > 0 ? (
        <ul className="space-y-4">
          {bookmarks.map(bookmark => (
            <li key={bookmark.id}>
              <Card>
                <Anchor
                  href={bookmark.url}
                  className="text-xl font-semibold text-gray-800"
                >
                  <h3 className="mb-2">{bookmark.title}</h3>
                </Anchor>
                <div className="flex justify-between items-center">
                  <p>{bookmark.url}</p>

                  <Form
                    method="delete"
                    action={`/admin/bookmarks/${bookmark.id}`}
                    reloadDocument
                  >
                    <button type="submit" className="link">
                      Delete
                    </button>
                  </Form>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <Alert>
          You have no bookmarks yet!
          <Link to="new" className="ml-2">
            Create one
          </Link>
        </Alert>
      )}
    </>
  )
}
