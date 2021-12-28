import clsx from 'clsx'
import * as React from 'react'
import { Link, NavLink } from 'remix'

type NavItem = {
  name: string
  to: string
}

type NavbarProps = {
  className?: string
  primaryNavItem: NavItem
  navItems: Array<NavItem>
}

export function Navbar({ className, primaryNavItem, navItems }: NavbarProps) {
  return (
    <nav className={clsx('flex items-center justify-between', className)}>
      <Link
        to={primaryNavItem.to}
        prefetch="intent"
        className="text-lg font-medium"
      >
        <h1>{primaryNavItem.name}</h1>
      </Link>

      <ul className="flex justify-between space-x-4">
        {navItems.map(navItem => (
          <li key={navItem.to}>
            <NavLink
              to={navItem.to}
              prefetch="intent"
              className={({ isActive }) =>
                clsx(
                  isActive && 'underline text-gray-800',
                  'text-lg font-medium link'
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
