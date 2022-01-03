import HomeIcon from '@heroicons/react/solid/HomeIcon'
import type { LoaderFunction } from 'remix'
import { Outlet } from 'remix'
import { Breadcrumb, Breadcrumbs } from '~/components/breadcrumbs'
import { Navbar } from '~/components/navbar'
import type { Handle } from '~/types'
import { requireLoggedIn } from '~/utils/session.server'

export const handle: Handle = {
  breadcrumb: ({ path, isLast }) => (
    <Breadcrumb to={path} displayAsLink={!isLast} label="Dashboard">
      <HomeIcon className="h-5 w-5" />
    </Breadcrumb>
  ),
}

export const loader: LoaderFunction = async ({ request }) => {
  await requireLoggedIn(request)
  return null
}

export default function Admin() {
  return (
    <>
      <header className="bg-gray-200">
        <Navbar
          className="container mx-auto px-4 md:px-0 py-4 md:py-8"
          showLogoutButton
          primaryNavItem={{
            name: 'admin',
            to: '/admin',
          }}
          navItems={[
            {
              name: 'bookmarks',
              to: '/admin/bookmarks',
            },
            {
              name: 'page views',
              to: '/admin/page-views',
            },
            {
              name: 'posts',
              to: '/admin/posts',
            },
            {
              name: 'public site',
              to: '/',
            },
          ]}
        />
      </header>

      <main className="container mx-auto px-4 md:px-0 py-4 md:py-8">
        <Breadcrumbs className="mb-4" />
        <Outlet />
      </main>

      <footer className="container mx-auto px-4 md:px-0 py-4 md:py-8 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Luke Rucker</p>
      </footer>
    </>
  )
}
