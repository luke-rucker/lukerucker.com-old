import { differenceInDays, format, formatDistance, parse, set } from 'date-fns'

const defaultFormat = 'yyyy-MM-dd'

export function parseDateString(val: unknown, dateFormat = defaultFormat) {
  if (typeof val !== 'string' || !val) return null

  const parsedDate = parse(val, dateFormat, new Date())

  return typeof parsedDate === 'object' ? parsedDate : null
}

export const formatDate = (date: Date, dateFormat = defaultFormat) =>
  format(date, dateFormat)

export const stripTime = (date: Date) =>
  set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })

export function formatDistanceToToday(past: Date) {
  const dayInPast = stripTime(past)
  const today = stripTime(new Date())
  const daysAgo = differenceInDays(dayInPast, today)

  return daysAgo === 0
    ? 'today'
    : formatDistance(dayInPast, today, { addSuffix: true })
}
