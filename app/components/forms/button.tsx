import clsx from 'clsx'
import * as React from 'react'

export type ButtonProps = {
  variant?: 'primary' | 'danger' | 'link'
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
        variant === 'link'
          ? 'link'
          : [
              'px-3 py-2 focus:outline-none border-2 border-transparent',
              variant === 'primary' &&
                'bg-gray-200 hover:bg-gray-300 hover:border-gray-300 focus:border-gray-500',
              variant === 'danger' &&
                'bg-red-200 text-red-600 hover:text-red-800 hover:bg-red-300 hover:border-red-300 focus:border-red-500',
            ],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
