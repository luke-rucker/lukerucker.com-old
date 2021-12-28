import { HomeIcon } from '@heroicons/react/solid'
import * as React from 'react'
import { LoaderFunction, Outlet } from 'remix'
import { Breadcrumbs, Navbar } from '~/components'
import { requireLoggedIn } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  await requireLoggedIn(request)
  return null
}

export default function Admin() {
  return (
    <>
      <header className="bg-gray-200">
        <Navbar
          className="py-4 md:py-8 container mx-auto px-5 md:px-0"
          primaryNavItem={{
            name: 'luke rucker admin',
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

      <main className="container mx-auto px-5 md:px-0 pt-8 md:pt-16 pb-4">
        <Breadcrumbs
          replacements={{ admin: <HomeIcon className="h-5 w-5" /> }}
        />

        <Outlet />
      </main>

      <footer className="py-4 md:py-8 container mx-auto px-5 md:px-0 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Luke Rucker</p>
      </footer>
    </>
  )
}
