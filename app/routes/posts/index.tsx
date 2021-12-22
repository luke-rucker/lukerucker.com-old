import * as React from 'react'
import { MetaFunction } from 'remix'

export const meta: MetaFunction = () => ({
  title: 'Posts | Luke Rucker',
})

export default function Posts() {
  return <div>Posts</div>
}
