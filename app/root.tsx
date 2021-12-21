import * as React from 'react'
import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from 'remix'
import type { MetaFunction } from 'remix'
import { Footer, Navbar } from '~/components'

import styles from './tailwind.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const meta: MetaFunction = () => ({
  title: 'Luke Rucker',
})

export default function App() {
  const matches = useMatches()

  const includeScripts = matches.some(match => match.handle?.hydrate)

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-100 mx-auto max-w-prose px-5 md:px-0">
        <Navbar />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        {includeScripts ? <Scripts /> : null}
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  )
}
