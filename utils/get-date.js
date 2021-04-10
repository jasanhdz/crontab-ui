const timeZone = {
  hour12: true,
  timeZone: 'America/Mexico_City'
}

const optionsNumeric = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',  
  ...timeZone
}

const optionsString = {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  ...timeZone
}

export default function getDate(date, type) {
  switch (type) {
    case 'numeric':
      return Intl.DateTimeFormat('default', optionsNumeric).format(new Date(date))
    case 'string':
      const f = Intl.DateTimeFormat('default', optionsString).format(new Date(date))
      return f.charAt(0).toUpperCase() + f.slice(1)
    default:
      return Intl.DateTimeFormat('default', optionsNumeric).format(new Date(date))
  }
}

const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

const getSecondsDiff = timestamp => (Date.now() - timestamp) / 1000
const getUnitAndValueDate = (secondsElapsed) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === "second") {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }
}

export const getTimeAgo = timestamp => {
  const rtf = new Intl.RelativeTimeFormat()

  const secondsElapsed = getSecondsDiff(timestamp)
  const {value, unit} = getUnitAndValueDate(secondsElapsed)
  return rtf.format(value, unit)
}