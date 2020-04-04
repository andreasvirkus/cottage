import dayjs from 'dayjs'
import format from 'dayjs/plugin/advancedFormat'

dayjs.extend(format)

export function formatPostDate(date, short = false) {
  const format = short ? 'MMM, Do' : 'DD MMM YYYY'
  return dayjs(date).format(format)
}
