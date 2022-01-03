import clsx from 'clsx'
import * as React from 'react'

type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

export function Anchor({
  className,
  target = '_blank',
  rel = 'noreferrer',
  children,
  ...props
}: AnchorProps) {
  return (
    <a className={clsx('link', className)} target={target} rel={rel} {...props}>
      {children}
    </a>
  )
}
