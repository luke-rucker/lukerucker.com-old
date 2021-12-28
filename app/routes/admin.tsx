import { SSRProvider } from '@react-aria/ssr'
import * as React from 'react'
import { Outlet } from 'remix'

export default function Admin() {
  return (
    <div>
      Admin
      <Outlet />
    </div>
  )
}
