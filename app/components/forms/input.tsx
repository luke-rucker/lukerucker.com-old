import { useId } from '@react-aria/utils'
import clsx from 'clsx'
import * as React from 'react'

type InputProps = {
  error?: string
  label: string
} & Omit<React.HTMLProps<HTMLInputElement>, 'aria-invalid' | 'aria-describedBy'>

export function Input({ id, className, error, label, ...props }: InputProps) {
  const inputId = useId(id)
  const errorId = useId()

  return (
    <>
      <label className="label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={clsx('input input-bordered', error && 'input-error')}
        aria-invalid={Boolean(error)}
        {...(error ? { 'aria-describedby': errorId } : null)}
        {...props}
      />
      {error ? <span id={errorId}>{error}</span> : null}
    </>
  )
}
