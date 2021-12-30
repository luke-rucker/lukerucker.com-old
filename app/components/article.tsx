/* eslint-disable react/no-danger */

import clsx from 'clsx'
import * as React from 'react'

type ArticleProps = {
  header?: React.ReactNode
  html: string
  className?: string
}

export function Article({ header, html, className }: ArticleProps) {
  return (
    <article className={clsx('prose-text', className)}>
      {header ? <header className="not-prose">{header}</header> : null}
      <section dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}
