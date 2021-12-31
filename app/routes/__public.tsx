import { LoaderFunction, Outlet, useLoaderData } from 'remix'
import { AdminToolbar } from '~/components/admin-toolbar'
import { Navbar } from '~/components/navbar'
import { useIsLoggedIn } from '~/contexts/is-logged-in-context'
import { getHitsFor } from '~/db/hits.server'

export const loader: LoaderFunction = async ({ request }) => {
  const { pathname } = new URL(request.url)
  const hits = await getHitsFor(pathname)
  return hits
}

export default function Public() {
  const hits = useLoaderData<number>()
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
              name: 'posts',
              to: '/posts',
            },
          ]}
        />

        <main className="py-8 md:py-16">
          <Outlet />
        </main>

        <footer className="py-4 md:py-8">
          <p className="text-gray-600 text-lg mb-4">{hits} Page Views</p>
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Luke Rucker
          </p>
        </footer>
      </div>
    </>
  )
}
