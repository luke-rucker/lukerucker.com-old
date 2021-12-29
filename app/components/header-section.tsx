import * as React from 'react'

type HeaderSectionProps = {
  text: string
  right?: React.ReactNode
}

export function HeaderSection({ text, right }: HeaderSectionProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold">{text}</h2>
      {right}
    </div>
  )
}
