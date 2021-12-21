import * as React from 'react'
import { Link } from 'remix'

type NavItem = {
  name: string
  to: string
}

const navItems: Array<NavItem> = [
  {
    name: 'Home',
    to: '/',
  },
  {
    name: 'About',
    to: '/about',
  },
]

export function Navbar() {
  return (
    <nav className="flex justify-between">
      <Link to="/" prefetch="intent">
        <h1>Luke Rucker</h1>
      </Link>

      <ul className="flex justify-between">
        {navItems.map(navItem => (
          <li key={navItem.to}>
            <Link to={navItem.to} prefetch="intent">
              {navItem.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
