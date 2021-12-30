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
    <article
      className={clsx(
        'prose md:prose-xl prose-pre:rounded-none md:prose-pre:rounded-none',
        className
      )}
    >
      {header ? <header className="">{header}</header> : null}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}
