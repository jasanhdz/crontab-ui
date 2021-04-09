export const DAYS = [
  { value: 'SUN', tile: 'Domingo' },
  { value: 'MON', tile: 'Lunes' },
  { value: 'TUE', tile: 'Martes' },
  { value: 'WED', tile: 'Miercoles' },
  { value: 'THU', tile: 'Jueves' },
  { value: 'FRI', tile: 'Viernes' },
  { value: 'SAT', tile: 'Sabado' },
]

export const MONTHS = [
  { value: 'JAN', tile: 'Enero' },
  { value: 'FEB', tile: 'Febrero' },
  { value: 'MAR', tile: 'Marzo' },
  { value: 'APR', tile: 'Abril' },
  { value: 'MAY', tile: 'Mayo' },
  { value: 'JUN', tile: 'Junio' },
  { value: 'JUL', tile: 'Julio' },
  { value: 'AUG', tile: 'Agosto' },
  { value: 'SEP', tile: 'Septiembre' },
  { value: 'OCT', tile: 'Octubre' },
  { value: 'NOV', tile: 'Noviembre' },
  { value: 'DEV', tile: 'Diciembre' },
]
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

export function getMonths() {
  const months = ['Enero', 'Febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
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