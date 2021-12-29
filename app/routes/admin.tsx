import * as React from 'react'
import { LoaderFunction, Outlet } from 'remix'
import { Navbar } from '~/components'
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
        <Outlet />
      </main>

      <footer className="container mx-auto px-4 py-4 md:py-8 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Luke Rucker</p>
      </footer>
    </>
  )
}
