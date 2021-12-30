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
      <p>
        Etiam vehicula dolor et lectus pharetra luctus. Nullam hendrerit libero
        purus. Aenean et urna id lorem pretium egestas. Nam blandit ante gravida
        blandit molestie. Morbi interdum augue in maximus viverra. Maecenas
        volutpat, justo eu mattis euismod, neque nulla hendrerit metus, laoreet
        faucibus erat urna porttitor augue. Ut venenatis leo ex, non volutpat
        elit dapibus ac. Maecenas quis risus nec odio placerat blandit nec eu
        justo. Aenean in egestas odio. Mauris condimentum iaculis finibus. Nam
        rhoncus dui et porta convallis.
      </p>

      <h3>Now</h3>
      <p>
        Nullam id tincidunt dui, vel volutpat eros. Suspendisse purus quam,
        rhoncus id felis sit amet, hendrerit cursus nunc. Aliquam laoreet
        bibendum nunc at tristique. Aliquam mauris massa, posuere nec ex nec,
        laoreet egestas nisl. Nulla efficitur erat ut leo volutpat, ac lacinia
        odio volutpat. Aliquam id tellus sit amet tellus pretium suscipit.
        Quisque orci lectus, rhoncus et lectus ut, consequat molestie mauris. Ut
        in aliquam ipsum, ornare pellentesque eros. Vivamus scelerisque libero
        eu egestas faucibus. Duis eu felis urna. Sed molestie elit in odio
        tempus consectetur. Nunc porta rutrum justo, ac egestas augue hendrerit
        rhoncus. Nunc id rutrum augue. Curabitur a bibendum ante. Donec aliquam
        finibus lectus, ut bibendum ipsum fermentum non. Etiam venenatis, justo
        at facilisis porta, neque sem vulputate leo, vel imperdiet sem magna
        commodo nibh.
      </p>
    </article>
  )
}
