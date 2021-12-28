import * as React from 'react'
import { LoaderFunction, MetaFunction, Outlet } from 'remix'
import { Navbar } from '~/components'
import { requireLoggedIn } from '~/utils/session.server'

export const meta: MetaFunction = () => ({
  title: 'Admin | Luke Rucker',
})

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

      <main className="container mx-auto px-5 md:px-0">
        <Outlet />
      </main>

      <footer className="py-4 md:py-8 container mx-auto px-5 md:px-0 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Luke Rucker</p>
      </footer>
    </>
  )
}
