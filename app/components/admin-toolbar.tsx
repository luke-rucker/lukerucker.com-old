import { useMatches } from 'remix'
import { Link } from './link'
import { LogoutButton } from './logout-button'

export function AdminToolbar() {
  const matches = useMatches()
  const matchesWithToolbars = matches.filter(
    match => match.handle?.adminToolbar
  )

  return (
    <div className="bg-gray-200">
      <nav
        className="py-4 px-4 md:px-0 container mx-auto flex flex-wrap items-center justify-between"
        aria-label="Admin"
      >
        <Link to="admin" className="font-semibold text-gray-600">
          admin dashboard
        </Link>

        <ul className="flex flex-wrap items-center gap-x-4 md:gap-x-5">
          {matchesWithToolbars.map(match => (
            <li key={match.pathname}>
              {match.handle.adminToolbar({ loaderData: match.data })}
            </li>
          ))}

          <li>
            <Link to="admin/posts/new" className="text-gray-600">
              new post
            </Link>
          </li>
          <li>
            <LogoutButton className="text-gray-600" />
          </li>
        </ul>
      </nav>
    </div>
  )
}
