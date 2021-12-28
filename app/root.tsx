import { SSRProvider } from '@react-aria/ssr'
import * as React from 'react'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from 'remix'
import type { LinksFunction, MetaFunction } from 'remix'
import { PublicLayout } from '~/components'

import styles from './tailwind.css'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&display=swap',
  },
  { rel: 'stylesheet', href: styles },
]

export const meta: MetaFunction = () => ({
  title: 'Luke Rucker',
})

export default function App() {
  const matches = useMatches()

  const isAdminRoute = matches.some(
    match =>
      match.pathname.includes('/admin') || match.pathname.includes('/login')
  )

  const shouldIncludeScripts = matches.some(match => match.handle?.hydrate)

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-50 font-mono text-gray-800">
        <ScrollRestoration />
        {shouldIncludeScripts ? <Scripts /> : null}
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}

        {/* If match is admin route, delegate layout to admin index */}
        {isAdminRoute ? (
          <SSRProvider>
            <Outlet />
          </SSRProvider>
        ) : (
          <PublicLayout />
        )}
      </body>
    </html>
  )
}
