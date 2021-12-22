import * as React from 'react'
import { MetaFunction } from 'remix'

export const meta: MetaFunction = () => ({
  title: 'About | Luke Rucker',
})

export default function About() {
  return (
    <article className="prose lg:prose-xl">
      <h2>About Me</h2>

      <h3>Beginnings</h3>
      <p>Blah blah</p>

      <h3>Now</h3>
      <p>Blah blah blah</p>
    </article>
  )
}
