import clsx from 'clsx'
import { format } from 'date-fns'

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
      className={clsx('text-sm text-gray-400', className)}
      dateTime={format(date, 'yyyy-MM-dd')}
      {...props}
    >
      {date.toDateString()}
    </time>
  )
}
