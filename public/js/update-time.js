// Included directly in the browser, hence why this can't be TS
const datetime = document.querySelector('time')
const readableTime = document.querySelector('.js-time-of-day')


function updateTime() {
  if (!datetime) return

  const today = new Date()
  const hour = today.getHours()
  const hourFormatted = hour < 10 ? '0' + hour : hour
  const min = today.getMinutes()
  const minFormatted = min < 10 ? '0' + min : min
  let timeOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'

  if (hour < 6) timeOfDay = 'night'

  const time = `${hourFormatted}:${minFormatted}`
  datetime.setAttribute('datetime', today.toISOString())
  datetime.textContent = time
  readableTime.textContent = timeOfDay
}

updateTime()
setInterval(updateTime, 30 * 1000)