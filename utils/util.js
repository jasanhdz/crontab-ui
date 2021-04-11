function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function createHeadCell(key, isNumeric = false) {
  return {
    id: key,
    numeric: isNumeric,
    disablePadding: true,
    label: capitalizeFirstLetter(key)
  }
}

export function createSchedulingOfValues(values, isCreated) {
  /* 
    S: Seconds, M: Minutes, H: Hours, DM: DaysOfMonth , M: Month, DW DaysOfWekenday, Y: Years
    example my cronjob every all: 
    *  *  *  ?   *  *  *
    S  M  H  DM  M  DW Y
  */ 
  const { seconds, minutes, hours, days, month, year } = values
  let daysOfMonth = days.OF_MONTH.value
  // This validation should not be necessary, but to create a resource the value: ?
  if (isCreated) {
    if (!daysOfMonth || daysOfMonth === '?') {
      daysOfMonth = '*'
    }
  }
  const scheduling = `${seconds.value || '*'} ${minutes.value || '*'} ${hours.value || '*'} ${daysOfMonth || '?'} ${month.value} ${days.OF_WEEKDAY.value || '*'} ${year.value || '*'}`
  return scheduling
}