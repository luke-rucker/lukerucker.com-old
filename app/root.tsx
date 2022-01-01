import { SSRProvider } from '@react-aria/ssr'
import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
} from 'remix'
import { IsLoggedInContext } from '~/contexts/is-logged-in-context'
import { checkIfIsLoggedIn } from '~/utils/session.server'

import styles from '~/styles/app.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const meta: MetaFunction = () => ({
  title: 'Luke Rucker',
  description: 'My slice of the internet.',
})

export const loader: LoaderFunction = ({ request }) =>
  checkIfIsLoggedIn(request)

export default function App() {
  const isLoggedIn = useLoaderData<boolean>()
  const matches = useMatches()

  const shouldIncludeScripts = matches.some(match => match.handle?.hydrate)

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-mono text-gray-800">
        <noscript>This site runs just fine without javascript.</noscript>

        <ScrollRestoration />
        {shouldIncludeScripts ? <Scripts /> : null}
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}

        <SSRProvider>
          <IsLoggedInContext.Provider value={isLoggedIn}>
            <Outlet />
          </IsLoggedInContext.Provider>
        </SSRProvider>
      </body>
    </html>
  )
}
