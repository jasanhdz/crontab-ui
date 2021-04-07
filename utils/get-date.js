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