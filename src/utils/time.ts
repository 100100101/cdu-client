import Moment from 'moment'

const addZero = (number: number): string => {
  if (number < 0) return '00'
  return `${number < 10 ? '0' : ''}${number}`
}

export const msToHoursMinutesSeconds = (ms: number): string => {
  const duration = Moment.duration(ms, 'milliseconds')
  const hours = Math.floor(duration.asHours())
  const minutes = duration.minutes()
  const seconds = duration.seconds()
  return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`
}
