import * as React from 'react'

type PageHeadingProps = {
  header: React.ReactNode
  children: React.ReactNode
}

export function PageHeading({ header, children }: PageHeadingProps) {
  return (
    <>
      <h2 className="text-3xl font-bold mb-4">{header}</h2>
      <p className="text-gray-500 font-semibold mb-8 md:mb-12">{children}</p>
    </>
  )
}
