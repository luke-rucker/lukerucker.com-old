import { MetaFunction } from 'remix'
import { HeaderSection } from '~/components/header-section'

export const meta: MetaFunction = () => ({
  title: 'Admin | Luke Rucker',
})

export default function Admin() {
  return <HeaderSection text="Dashboard" />
}
