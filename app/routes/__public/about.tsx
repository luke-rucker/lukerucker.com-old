import type { LoaderFunction, MetaFunction } from 'remix'
import { Breadcrumb, Breadcrumbs } from '~/components/breadcrumbs'
import type { Handle } from '~/types'
import { recordPageViewFor } from '~/utils/page-views.server'

export const handle: Handle = {
  breadcrumb: ({ path, isLast }) => (
    <Breadcrumb to={path} displayAsLink={!isLast}>
      About
    </Breadcrumb>
  ),
}
export const meta: MetaFunction = () => ({
  title: 'About | Luke Rucker',
})

export const loader: LoaderFunction = ({ request }) => {
  recordPageViewFor(request)
  return null
}

export default function About() {
  return (
    <>
      <Breadcrumbs />

      <article className="prose-section">
        <header>
          <h2>Howdy, I&apos;m Luke :)</h2>

          <img
            src="/me.jpg"
            alt="Me in front of a pretty lake and some mountains"
          />

          <p>
            I&apos;m a 19 year old software developer currently based in
            Houston, Texas. I enjoy Typescript and mountains.
          </p>
        </header>

        <h3>Beginnings</h3>
        <p>
          Etiam vehicula dolor et lectus pharetra luctus. Nullam hendrerit
          libero purus. Aenean et urna id lorem pretium egestas. Nam blandit
          ante gravida blandit molestie. Morbi interdum augue in maximus
          viverra.
        </p>

        <h3>Now</h3>
        <p>
          Nullam id tincidunt dui, vel volutpat eros. Suspendisse purus quam,
          rhoncus id felis sit amet, hendrerit cursus nunc. Aliquam laoreet
          bibendum nunc at tristique. Aliquam mauris massa, posuere nec ex nec,
          laoreet egestas nisl. Nulla efficitur erat ut leo volutpat, ac lacinia
          odio volutpat.
        </p>
      </article>
    </>
  )
}
