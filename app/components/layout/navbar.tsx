import * as React from 'react'
import { Link } from 'remix'

type NavItem = {
  name: string
  to: string
}

const navItems: Array<NavItem> = [
  {
    name: 'Posts',
    to: '/posts',
  },
  {
    name: 'About',
    to: '/about',
  },
]

export function Navbar() {
  return (
    <nav className="py-2 flex items-center justify-between">
      <Link to="/" prefetch="intent" className="text-2xl font-medium">
        <h1>Luke Rucker</h1>
      </Link>

      <ul className="flex justify-between space-x-4">
        {navItems.map(navItem => (
          <li key={navItem.to}>
            <Link
              to={navItem.to}
              prefetch="intent"
              className="text-lg font-medium"
            >
              {navItem.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
