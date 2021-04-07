export function getTimeValues(min, max) {
  const items = []
  for (let i = min; i <= max; i++) {
    items.push({ value: i, tile: i })
  }
  return items
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