import * as React from 'react'
import { MetaFunction } from 'remix'

export const meta: MetaFunction = () => ({
  title: 'Blog | Luke Rucker',
})

export default function Blog() {
  return <div>Blog</div>
}
