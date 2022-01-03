import { Outlet } from 'remix'
import { Breadcrumb } from '~/components/breadcrumbs'
import { Handle } from '~/types'

export const handle: Handle = {
  breadcrumb: ({ path, isLast }) => (
    <Breadcrumb to={path} displayAsLink={!isLast}>
      Bookmarks
    </Breadcrumb>
  ),
}

export default function Bookmarks() {
  return <Outlet />
}
