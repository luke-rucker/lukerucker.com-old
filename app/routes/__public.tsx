import { Outlet } from 'remix'
import { AdminToolbar } from '~/components/admin-toolbar'
import { Navbar } from '~/components/navbar'
import { useIsLoggedIn } from '~/contexts/is-logged-in-context'

export default function Public() {
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

        <main className="pt-8 md:pt-16 pb-4">
          <Outlet />
        </main>

        <footer className="text-gray-500 py-4 md:py-8">
          <p>&copy; {new Date().getFullYear()} Luke Rucker</p>
        </footer>
      </div>
    </>
  )
}
