import * as React from 'react'
import { Link, Outlet } from 'remix'

export default function Admin() {
  return (
    <div>
      nested
      <Link to="/admin/logout">Logout</Link>
      <Outlet />
    </div>
  )
}