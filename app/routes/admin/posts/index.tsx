import * as React from 'react'
import { MetaFunction } from 'remix'
import { Link } from '~/components'

export const meta: MetaFunction = () => ({
  title: 'Posts | Luke Rucker',
})

export default function Posts() {
  return (
    <div className="flex justify-between">
      <h2 className="text-2xl font-bold">Posts</h2>
      <Link to="/admin/posts/new" className="text-xl">
        New
      </Link>
    </div>
  )
}
