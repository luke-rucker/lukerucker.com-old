import HomeIcon from '@heroicons/react/solid/HomeIcon'
import { Outlet } from 'remix'
import { useRouteData } from 'remix-utils'
import { AdminToolbar } from '~/components/admin-toolbar'
import { Breadcrumb } from '~/components/breadcrumbs'
import { Navbar } from '~/components/navbar'
import { SocialLinks } from '~/components/social-links'
import type { RootLoaderData } from '~/root'
import type { Handle } from '~/types'

export const handle: Handle = {
  breadcrumb: ({ path, isLast }) => (
    <Breadcrumb to={path} displayAsLink={!isLast} label="Home">
      <HomeIcon className="h-5 w-5" />
    </Breadcrumb>
  ),
}

export default function Public() {
  const rootData = useRouteData<RootLoaderData>('/')
  const isLuke = rootData?.isLuke

  return (
    <>
      {isLuke ? <AdminToolbar /> : null}

      <div className="bg-neutral">
        <Navbar
          className="mx-auto max-w-prose px-5 md:px-0 py-2 md:py-4"
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
      </div>

      <div className="mx-auto max-w-prose px-5 md:px-0">
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
