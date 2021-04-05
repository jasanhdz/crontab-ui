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
    items.push({value: month, tile: month.charAt(0).toUpperCase() + month.slice(1)})
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