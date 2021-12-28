import * as React from 'react'
import { MetaFunction } from 'remix'

export const meta: MetaFunction = () => ({
  title: 'New Post | Luke Rucker',
})

export default function NewPost() {
  return (
    <div>
      <h2 className="text-2xl font-bold">New Post</h2>
    </div>
  )
}
