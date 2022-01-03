import * as React from 'react'

export type BreadcrumbParams<LoaderData = never> = {
  loaderData: LoaderData
  path: string
  isLast: boolean
}

export type AdminToolbarParams<LoaderData = never> = {
  loaderData: LoaderData
}

export type Handle = {
  breadcrumb?: (params: BreadcrumbParams) => React.ReactNode
  adminToolbar?: (params: AdminToolbarParams) => React.ReactNode
}
