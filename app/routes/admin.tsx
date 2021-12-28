import * as React from 'react'
import { LoaderFunction, MetaFunction, Outlet } from 'remix'
import { requireLoggedIn } from '~/utils/session.server'

export const meta: MetaFunction = () => ({
  title: 'Admin | Luke Rucker',
})

export const loader: LoaderFunction = async ({ request }) => {
  await requireLoggedIn(request)
  return null
}

export default function Admin() {
  return (
    <div>
      Admin
      <Outlet />
    </div>
  )
}
