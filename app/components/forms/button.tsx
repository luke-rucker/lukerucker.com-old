import clsx from 'clsx'
import * as React from 'react'

type ButtonProps = {
  variant?: 'primary' | 'danger'
  children: React.ReactNode
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  /* eslint-disable react/button-has-type */
  return (
    <button
      className={clsx(
        'px-3 py-2 focus:ring-2',
        {
          'bg-gray-200 hover:bg-gray-300 focus:ring-gray-500':
            variant === 'primary',
          'bg-red-200 text-red-600 hover:text-red-800 hover:bg-red-300 focus:ring-red-500':
            variant === 'danger',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
