import HomeIcon from '@heroicons/react/solid/HomeIcon'
import * as React from 'react'
import { LoaderFunction, Outlet } from 'remix'
import { Breadcrumb, BreadcrumbParams, Breadcrumbs, Navbar } from '~/components'
import { requireLoggedIn } from '~/utils/session.server'

export const handle = {
  breadcrumb: ({ path, isLast }: BreadcrumbParams) => (
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
          className="container mx-auto px-4 py-4 md:py-8 "
          primaryNavItem={{
            name: 'admin',
            to: '/admin',
          }}
          navItems={[
            {
              name: 'posts',
              to: '/admin/posts',
            },
            {
              name: 'logout',
              to: '/logout',
            },
          ]}
        />
      </header>

      <main className="container mx-auto px-4 py-4 md:py-8">
        <Breadcrumbs className="mb-4" />
        <Outlet />
      </main>

      <footer className="container mx-auto px-4 py-4 md:py-8 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Luke Rucker</p>
      </footer>
    </>
  )
}
