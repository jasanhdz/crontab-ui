export function getTimeValues(min, max) {
  const items = []
  for (let i = min; i <= max; i++) {
    items.push({ value: i, tile: i })
  }
  return items
}

export function getDaysOfTheMonth() {
  return getTimeValues(1, 31).map(({ tile, value }) => {
    if(value === 1 || value === 21 || value === 31) return { value, tile: `${tile}st`}
    if(value === 2 || value === 22) return {value, tile: `${tile}nd`}
    if(value === 3 || value === 23) return {value, tile: `${tile}rd`}
    return { value, tile: `${tile}th`}
  })
}

export function getDays() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days.map(day => ({ value: day, tile: day }))
}

export function getMonths() {
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  const items = []
  months.forEach((month) => {
    items.push({ value: month, tile: month.charAt(0).toUpperCase() + month.slice(1) })
  })
  return items
}

export function getYears(maxYear = 2098) {
  const max = new Date(maxYear, 1, 1).getFullYear()
  const min = new Date().getFullYear()
  const years = []

  for (let i = min; i <= max; i++) {
    years.push({ value: i, tile: i })
  }

  return years
}

export function addCheckedValue(stringValue, split, items) {
  if (stringValue.includes(split)) {
    const values = stringValue.split(split).map(str => isNaN(str) ? str : Number(str))
    return items.map(item => ({ ...item, checked: values.includes(item.value) }))
  }
  return items.map(item => ({ ...item, checked: false }))
}

export function cronTabOption(stringValue) {
  switch (true) {
    case stringValue === '*':
      return 'every'
    case stringValue.includes('/'):
      return 'starting'
    case stringValue.includes(','):
      return 'many'
    case stringValue.includes('-'):
      return 'between'
    default:
      return 'every'
  }
}