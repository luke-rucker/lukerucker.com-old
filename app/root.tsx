import { SSRProvider } from '@react-aria/ssr'
import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix'
import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix'
import { IsLoggedInContext } from '~/contexts/is-logged-in-context'
import { checkIfIsLoggedIn } from '~/utils/session.server'

import styles from '~/styles/app.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const meta: MetaFunction = () => ({
  title: 'Luke Rucker',
  description: 'My slice of the internet.',
})

type LoaderData = {
  isLoggedIn: boolean
  ENV: {
    ENVIRONMENT: typeof ENVIRONMENT
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const isLoggedIn = await checkIfIsLoggedIn(request)

  return json<LoaderData>({
    isLoggedIn,
    ENV: {
      ENVIRONMENT,
    },
  })
}

export default function App() {
  const { isLoggedIn, ENV } = useLoaderData<LoaderData>()

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
        <Scripts />
        {ENV.ENVIRONMENT === 'development' ? <LiveReload /> : null}

        <SSRProvider>
          <IsLoggedInContext.Provider value={isLoggedIn}>
            <Outlet />
          </IsLoggedInContext.Provider>
        </SSRProvider>
      </body>
    </html>
  )
}
