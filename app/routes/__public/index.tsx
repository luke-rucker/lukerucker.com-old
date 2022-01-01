import type { LoaderFunction } from 'remix'
import { recordPageViewFor } from '~/utils/page-views.server'

export const loader: LoaderFunction = ({ request }) =>
  recordPageViewFor(request)

export default function Index() {
  return (
    <div className="text-2xl font-bold">
      <h2>Hello world, I&apos;m Luke Rucker.</h2>
      <p className="text-gray-500">
        I&apos;m a 19 year old software developer.
      </p>
    </div>
  )
}
