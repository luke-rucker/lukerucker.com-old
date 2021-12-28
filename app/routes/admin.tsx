import * as React from 'react'
import { LoaderFunction, Outlet } from 'remix'
import { requireLoggedIn } from '~/utils/session.server'

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
