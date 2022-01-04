import * as React from 'react'

type PageHeadingProps = {
  header: React.ReactNode
  children: React.ReactNode
}

export function PageHeading({ header, children }: PageHeadingProps) {
  return (
    <header className="pb-12 md:pb-24">
      <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">{header}</h2>
      <p className="text-gray-500 text-sm md:text-base font-semibold">
        {children}
      </p>
    </header>
  )
}
