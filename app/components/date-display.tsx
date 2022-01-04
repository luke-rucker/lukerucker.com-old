import clsx from 'clsx'
import { formatDate } from '~/utils/dates'

type DateProps = { date: Date } & Omit<
  React.DetailedHTMLProps<
    React.TimeHTMLAttributes<HTMLTimeElement>,
    HTMLTimeElement
  >,
  'dateTime'
>

export function DateDisplay({ date, className, ...props }: DateProps) {
  return (
    <time
      className={clsx('text-sm text-gray-500', className)}
      dateTime={formatDate(date)}
      {...props}
    >
      {date.toDateString()}
    </time>
  )
}
