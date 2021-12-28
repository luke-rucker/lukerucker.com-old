import { useId } from '@react-aria/utils'
import clsx from 'clsx'
import * as React from 'react'

type InputProps = {
  error?: string
  label: string
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'aria-invalid' | 'aria-describedBy'
>

export function Input({
  id,
  className,
  error,
  label,
  readOnly,
  ...props
}: InputProps) {
  const inputId = useId(id)
  const errorId = useId()

  return (
    <div className="flex flex-col">
      <label className="pb-1" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={clsx(
          'border-2 py-2 px-3 focus:outline-none focus:border-gray-400',
          error && 'border-red-600',
          readOnly && 'cursor-not-allowed',
          className
        )}
        aria-invalid={Boolean(error)}
        {...(error ? { 'aria-describedby': errorId } : null)}
        readOnly={readOnly}
        {...props}
      />
      {error ? (
        <span className="pt-1 text-sm text-red-600" id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  )
}
