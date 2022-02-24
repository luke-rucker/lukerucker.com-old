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
    <nav className={clsx('drawer', className)}>
      <Link
        to={primaryNavItem.to}
        prefetch="intent"
        className="text-lg font-bold"
      >
        <h1>{primaryNavItem.name}</h1>
      </Link>

      <ul className="menu horizontal">
        {navItems.map(navItem => (
          <li key={navItem.to}>
            <NavLink to={navItem.to} prefetch="intent" className="rounded-btn">
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

// function Hamburger() {
//   return (
//     <div className="flex-none lg:hidden">
//       <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           className="inline-block w-6 h-6 stroke-current"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M4 6h16M4 12h16M4 18h16"
//           />
//         </svg>
//       </label>
//     </div>
//   )
// }

// function OtherNavbar() {
//   return (
//     <div className="rounded-lg shadow bg-base-200 drawer h-52">
//       <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
//       <div className="flex flex-col drawer-content">
//         <div className="w-full navbar bg-base-300">
//           <div className="flex-none lg:hidden">
//             <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 className="inline-block w-6 h-6 stroke-current"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 ></path>
//               </svg>
//             </label>
//           </div>
//           <div className="flex-1 px-2 mx-2">
//             <span>Change screen size to show/hide menu</span>
//           </div>
//           <div className="flex-none hidden lg:block">
//             <ul className="menu horizontal">
//               <li>
//                 <a className="rounded-btn">Item 1</a>
//               </li>
//               <li>
//                 <a className="rounded-btn">Item 2</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <div className="drawer-side">
//         <label for="my-drawer-3" className="drawer-overlay"></label>
//         <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
//           <li>
//             <a>Item 1</a>
//           </li>
//           <li>
//             <a>Item 2</a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   )
// }
