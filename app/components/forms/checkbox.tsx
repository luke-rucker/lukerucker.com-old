import { useId } from '@react-aria/utils'
import clsx from 'clsx'
import * as React from 'react'

type CheckboxProps = {
  error?: string
  label: string
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'type' | 'aria-invalid' | 'aria-describedBy'
>

export function Checkbox({
  id,
  className,
  error,
  label,
  readOnly,
  ...props
}: CheckboxProps) {
  const inputId = useId(id)
  const errorId = useId()

  return (
    <div>
      <div className="flex items-center">
        <label htmlFor={inputId}>{label}</label>
        <input
          type="checkbox"
          id={inputId}
          className={clsx(
            'ml-2',
            error && 'ring-2 ring-offset-2 ring-red-600',
            readOnly && 'cursor-not-allowed',
            className
          )}
          aria-invalid={Boolean(error)}
          {...(error ? { 'aria-describedby': errorId } : null)}
          readOnly={readOnly}
          {...props}
        />
      </div>

      {error ? (
        <span className="block pt-1 text-sm text-red-600" id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  )
}
