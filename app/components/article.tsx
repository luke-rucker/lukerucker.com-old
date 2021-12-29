/* eslint-disable react/no-danger */

import clsx from 'clsx'
import * as React from 'react'

type ArticleProps = {
  html: string
  className?: string
}

export function Article({ html, className }: ArticleProps) {
  return (
    <article
      dangerouslySetInnerHTML={{ __html: html }}
      className={clsx('prose', className)}
    />
  )
}
