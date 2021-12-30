import { SSRProvider } from '@react-aria/ssr'
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

import styles from '~/styles/app.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const meta: MetaFunction = () => ({
  title: 'Luke Rucker',
  description: 'My slice of the internet.',
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
        <noscript>This site runs just fine without javascript.</noscript>

        <ScrollRestoration />
        {shouldIncludeScripts ? <Scripts /> : null}
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}

        {/* If match is admin route, delegate layout to routes/admin.tsx */}
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
