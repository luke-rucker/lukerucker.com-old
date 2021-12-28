import * as React from 'react'
import { MetaFunction } from 'remix'

export const meta: MetaFunction = () => ({
  title: 'Admin | Luke Rucker',
})

export default function Admin() {
  return <h2 className="text-2xl font-bold">Dashboard</h2>
}
