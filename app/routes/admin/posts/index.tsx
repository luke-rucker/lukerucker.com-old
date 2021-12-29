import * as React from 'react'
import { MetaFunction } from 'remix'
import { HeaderSection, Link } from '~/components'

export const meta: MetaFunction = () => ({
  title: 'Posts | Luke Rucker',
})

export default function Posts() {
  return (
    <HeaderSection
      text="Posts"
      right={
        <Link to="/admin/posts/new" className="text-xl">
          New
        </Link>
      }
    />
  )
}
