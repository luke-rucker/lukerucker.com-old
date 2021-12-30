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
          'py-2 px-3 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 border-2 border-gray-300 focus:border-gray-600 focus:ring-gray-300',
          error && 'border-red-300 focus:border-red-600 focus:ring-red-400',
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
