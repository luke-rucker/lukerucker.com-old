import { Outlet } from 'remix'
import { Breadcrumb, BreadcrumbParams } from '~/components'

export const handle = {
  breadcrumb: ({ path, isLast }: BreadcrumbParams) => (
    <Breadcrumb to={path} displayAsLink={!isLast}>
      Posts
    </Breadcrumb>
  ),
}

export default function Posts() {
  return <Outlet />
}
