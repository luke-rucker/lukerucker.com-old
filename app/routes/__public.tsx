import { LoaderFunction, Outlet, useLoaderData } from 'remix'
import { AdminToolbar } from '~/components/admin-toolbar'
import { Navbar } from '~/components/navbar'
import { useIsLoggedIn } from '~/contexts/is-logged-in-context'
import type { PageViews } from '~/db/page-views.server'
import { getPageViewsFor } from '~/db/page-views.server'

export const loader: LoaderFunction = async ({ request }) => {
  const { pathname } = new URL(request.url)
  const pageViews = await getPageViewsFor(pathname)
  return pageViews
}

export default function Public() {
  const pageViews = useLoaderData<PageViews>()
  const isLoggedIn = useIsLoggedIn()

  return (
    <>
      {isLoggedIn ? <AdminToolbar /> : null}

      <div className="mx-auto max-w-prose px-5 md:px-0">
        <Navbar
          className="py-4 md:py-8"
          primaryNavItem={{
            name: 'luke rucker',
            to: '/',
          }}
          navItems={[
            {
              name: 'about',
              to: '/about',
            },
            {
              name: 'bookmarks',
              to: '/bookmarks',
            },
            {
              name: 'posts',
              to: '/posts',
            },
          ]}
        />

        <main className="py-8 md:py-16">
          <Outlet />
        </main>

        <footer className="py-4 md:py-8">
          <p className="text-gray-600 text-lg mb-4">
            {pageViews.views} Page Views
          </p>

          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Luke Rucker
          </p>
        </footer>
      </div>
    </>
  )
}
