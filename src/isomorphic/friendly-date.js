// @flow
const MONTHS = [
  'Jan',
  'Feb',
  'Mar', 
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default (date: Date): string => {
  const month = MONTHS[date.getMonth()]
  const dayOfWeek = DAYS_OF_WEEK[date.getDay()]
  const dayOfMonth = date.getDate()

  return `${month} ${dayOfMonth} ${dayOfWeek}`
}
