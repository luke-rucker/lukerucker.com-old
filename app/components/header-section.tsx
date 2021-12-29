import { HomeIcon } from '@heroicons/react/solid'
import * as React from 'react'
import { Breadcrumbs } from './breadcrumbs'

type HeaderSectionProps = {
  text: string
  right?: React.ReactNode
}

export function HeaderSection({ text, right }: HeaderSectionProps) {
  return (
    <>
      <Breadcrumbs
        replacements={{ admin: <HomeIcon className="h-5 w-5" /> }}
        className="mb-4"
      />
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{text}</h2>
        {right}
      </div>
    </>
  )
}
