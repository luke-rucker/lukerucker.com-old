import * as React from 'react'
import { MetaFunction } from 'remix'

export const meta: MetaFunction = () => ({
  title: 'About | Luke Rucker',
})

export default function About() {
  return (
    <article className="prose">
      <img
        src="/me.jpg"
        alt="Me in front of a pretty lake and some mountains"
      />

      <h2>Howdy, I&apos;m Luke :)</h2>
      <p>
        I&apos;m a 19 year old software engineer currently based in Houston,
        Texas.
      </p>

      <h2>About Me</h2>

      <h3>Beginnings</h3>
      <p>Blah blah</p>

      <h3>Now</h3>
      <p>Blah blah blah</p>
    </article>
  )
}
