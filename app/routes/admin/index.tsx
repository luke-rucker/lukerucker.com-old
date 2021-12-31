import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { HeaderSection } from '~/components/header-section'
import { getAllPageHits, PageHits } from '~/db/hits.server'

export const meta: MetaFunction = () => ({
  title: 'Admin | Luke Rucker',
})

export const loader: LoaderFunction = () => getAllPageHits()

export default function Admin() {
  const pageHits = useLoaderData<Array<PageHits>>()

  return <HeaderSection text="Dashboard" />
}
