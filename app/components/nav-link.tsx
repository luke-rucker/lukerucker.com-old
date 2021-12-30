import clsx from 'clsx'
import {
  NavLink as RemixNavLink,
  NavLinkProps as RemixNavLinkProps,
} from 'remix'

type NavLinkProps = {
  className?: string
} & Omit<RemixNavLinkProps, 'className'>

export function NavLink({ children, className, ...props }: NavLinkProps) {
  return (
    <RemixNavLink
      prefetch="intent"
      className={({ isActive }) =>
        clsx(
          isActive && 'underline text-gray-800',
          'text-lg font-medium link',
          className
        )
      }
      {...props}
    >
      {children}
    </RemixNavLink>
  )
}
