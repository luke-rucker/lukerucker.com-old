import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { CardSection } from '~/components/card-section'
import { HeaderSection } from '~/components/header-section'
import { Link } from '~/components/link'
import { getAllPageHits, PageHits } from '~/db/hits.server'

export const meta: MetaFunction = () => ({
  title: 'Admin | Luke Rucker',
})

export const loader: LoaderFunction = () => getAllPageHits()

export default function Admin() {
  const pageHits = useLoaderData<Array<PageHits>>()

  return (
    <>
      <HeaderSection text="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardSection header="Recently Edited Posts">
          <p>Recently edited posts</p>
        </CardSection>

        <CardSection header="Page Views">
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                <th>Path</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {pageHits.map(pageHit => (
                <tr key={pageHit.path}>
                  <td>
                    <Link to={pageHit.path}>{pageHit.path}</Link>
                  </td>
                  <td>{pageHit.hits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardSection>
      </div>
    </>
  )
}
