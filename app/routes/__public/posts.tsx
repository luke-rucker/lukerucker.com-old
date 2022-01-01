import { Outlet } from 'remix'
import { Breadcrumb } from '~/components/breadcrumbs'
import type { Handle } from '~/types'

export const handle: Handle = {
  breadcrumb: ({ path, isLast }) => (
    <Breadcrumb to={path} displayAsLink={!isLast}>
      Posts
    </Breadcrumb>
  ),
}

export default function Posts() {
  return <Outlet />
}
