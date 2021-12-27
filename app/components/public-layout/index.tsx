import * as React from 'react'
import { Outlet } from 'remix'
import { Footer } from './footer'
import { Navbar } from './navbar'

export function PublicLayout() {
  return (
    <div className="mx-auto max-w-prose px-5 md:px-0">
      <Navbar className="py-4 md:py-8" />
      <main className="pt-8 md:pt-16 pb-4">
        <Outlet />
      </main>
      <Footer className="py-4 md:py-8" />
    </div>
  )
}
