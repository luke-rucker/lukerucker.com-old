import { Outlet } from 'remix'
import { Breadcrumb } from '~/components/breadcrumbs'
import { Handle } from '~/utils/handle.server'

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
