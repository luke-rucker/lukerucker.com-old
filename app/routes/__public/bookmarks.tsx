import type { LoaderFunction } from 'remix'
import { Link } from '~/components/link'
import { PageHeading } from '~/components/page-heading'
import type { Handle } from '~/types'
import { recordPageViewFor } from '~/utils/page-views.server'

export const handle: Handle = {
  adminToolbar: () => <Link to="/admin/bookmarks">edit bookmarks</Link>,
}

export const loader: LoaderFunction = ({ request }) => {
  recordPageViewFor(request)
  return null
}

export default function Bookmarks() {
  return (
    <PageHeading header="Bookmarks">
      Just some thoughts... Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Nullam ut magna nec quam dictum dapibus vel consequat metus.
      Praesent laoreet dui eu elit semper tincidunt.
    </PageHeading>
  )
}
