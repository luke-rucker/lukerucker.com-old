import clsx from 'clsx'
import * as React from 'react'
import { Link, NavLink } from 'remix'

type NavItem = {
  name: string
  to: string
}

const navItems: Array<NavItem> = [
  {
    name: 'about',
    to: '/about',
  },
  {
    name: 'blog',
    to: '/blog',
  },
]

type NavbarProps = {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  return (
    <nav className={clsx('flex items-center justify-between', className)}>
      <Link to="/" prefetch="intent" className="text-lg font-medium">
        <h1>luke rucker</h1>
      </Link>

      <ul className="flex justify-between space-x-4">
        {navItems.map(navItem => (
          <li key={navItem.to}>
            <NavLink
              to={navItem.to}
              prefetch="intent"
              className={({ isActive }) =>
                clsx(
                  'text-lg font-medium text-gray-500 hover:underline hover:text-gray-700',
                  isActive && 'underline'
                )
              }
            >
              {navItem.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
