import {
  ExclamationIcon,
  FolderIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'
import clsx from 'clsx'
import * as React from 'react'

type AlertVariant = 'info' | 'success' | 'warning' | 'error'

type AlertProps = {
  variant?: AlertVariant
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'role'>

export function Alert({
  variant = 'info',
  children,
  className,
  ...props
}: AlertProps) {
  const iconClasses = 'w-6 h-6 mx-2 stroke-current'

  const icons: { [key in AlertVariant]: React.ReactNode } = {
    info: <InformationCircleIcon className={iconClasses} />,
    success: <FolderIcon className={iconClasses} />,
    warning: <ExclamationIcon className={iconClasses} />,
    error: <ExclamationIcon className={iconClasses} />,
  }

  return (
    <div
      className={clsx(
        'alert',
        {
          'alert-info': variant === 'info',
          'alert-success': variant === 'success',
          'alert-warning': variant === 'warning',
          'alert-error': variant === 'error',
        },
        className
      )}
      role="alert"
      {...props}
    >
      <div className="flex-1">
        {icons[variant]}
        <label>{children}</label>
      </div>
    </div>
  )
}
