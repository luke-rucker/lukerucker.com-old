import clsx from 'clsx'
import { Link, NavLink } from 'remix'
import { LogoutButton } from './logout-button'

type NavItem = {
  name: string
  to: string
}

type NavbarProps = {
  className?: string
  primaryNavItem: NavItem
  navItems: Array<NavItem>
  showLogoutButton?: boolean
}

export function Navbar({
  className,
  primaryNavItem,
  navItems,
  showLogoutButton,
}: NavbarProps) {
  return (
    <nav
      className={clsx('flex flex-wrap items-center justify-between', className)}
    >
      <Link
        to={primaryNavItem.to}
        prefetch="intent"
        className="text-lg font-semibold"
      >
        <h1>{primaryNavItem.name}</h1>
      </Link>

      <ul className="flex flex-wrap justify-between gap-x-4 md:gap-x-5 text-lg font-medium">
        {navItems.map(navItem => (
          <li key={navItem.to}>
            <NavLink
              to={navItem.to}
              prefetch="intent"
              className={({ isActive }) =>
                clsx('link', isActive && 'underline text-gray-800')
              }
            >
              {navItem.name}
            </NavLink>
          </li>
        ))}

        {showLogoutButton ? (
          <li>
            <LogoutButton />
          </li>
        ) : null}
      </ul>
    </nav>
  )
}
