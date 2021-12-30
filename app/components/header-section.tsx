import * as React from 'react'

type HeaderSectionProps = {
  text: string
  left?: React.ReactNode
  right?: React.ReactNode
}

export function HeaderSection({ text, left, right }: HeaderSectionProps) {
  return (
    <div className="mb-4 flex items-center justify-between flex-wrap space-y-2">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold">{text}</h2>
        {left}
      </div>

      {right}
    </div>
  )
}
