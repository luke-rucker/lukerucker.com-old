import clsx from 'clsx'
import * as React from 'react'
import { Card } from './card'

type CardSectionProps = {
  header: React.ReactNode
  contentClassName?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

export function CardSection({
  header,
  contentClassName,
  children,
  ...props
}: CardSectionProps) {
  return (
    <section {...props}>
      <h3 className="text-xl font-semibold mb-2">{header}</h3>
      <Card className={clsx(contentClassName)}>{children}</Card>
    </section>
  )
}
