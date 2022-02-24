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
import { checkIfIsLuke } from '~/utils/session.server'

import styles from '~/styles/app.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const meta: MetaFunction = () => ({
  title: 'Luke Rucker',
  description: 'My slice of the internet.',
})

export type RootLoaderData = {
  isLuke: boolean
  ENV: {
    ENVIRONMENT: typeof ENVIRONMENT
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const isLuke = await checkIfIsLuke(request)

  return json<RootLoaderData>({
    isLuke,
    ENV: {
      ENVIRONMENT,
    },
  })
}

export default function App() {
  const { ENV } = useLoaderData<RootLoaderData>()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <noscript>This site runs just fine without javascript.</noscript>

        <ScrollRestoration />
        <Scripts />
        {ENV.ENVIRONMENT === 'development' ? <LiveReload /> : null}

        <SSRProvider>
          <Outlet />
        </SSRProvider>
      </body>
    </html>
  )
}
