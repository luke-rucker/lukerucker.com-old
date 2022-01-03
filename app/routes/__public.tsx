import { Outlet } from 'remix'
import { AdminToolbar } from '~/components/admin-toolbar'
import { Navbar } from '~/components/navbar'
import { SocialLinks } from '~/components/social-links'
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
          <div className="flex flex-wrap-reverse gap-y-2 justify-between items-center">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} Luke Rucker
            </p>

            <SocialLinks />
          </div>
        </footer>
      </div>
    </>
  )
}
