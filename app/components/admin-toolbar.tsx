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
      <div className="h-12 px-4 md:px-0 container mx-auto flex items-center justify-between">
        <Link to="admin">admin dashboard</Link>

        <ul className="flex items-center space-x-4">
          {matchesWithToolbars.map(match => (
            <li key={match.pathname}>
              {match.handle.adminToolbar({ loaderData: match.data })}
            </li>
          ))}

          <li>
            <Link to="admin/posts/new">new post</Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </div>
  )
}
