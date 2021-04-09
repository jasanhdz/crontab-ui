import { OPTION_DAY_ALL as OPTION_DAY, OPTIONS } from 'constants/crontab'

export function addCheckedValue(stringValue, split, items) {
  if (stringValue.includes(split)) {
    const values = stringValue.split(split).map(str => isNaN(str) ? str : Number(str))
    return items.map(item => ({ ...item, checked: values.includes(item.value) }))
  }
  return items.map(item => ({ ...item, checked: false }))
}

function containts(target = '', pattern) {
  let value = 0
  pattern.forEach(word => {
    value = value + target.includes(word)
  })
  return (value === 1)
}

export function cronTabOptionMonthOrWeekday(strMonth, strWeekday) {
  switch (true) {
    case strWeekday === '*':
      return OPTION_DAY.EVERY_WEEKDAY
    case /^[1-7]?[\/]{1}?[1-7]$/.test(strWeekday):
      return OPTION_DAY.STARTING_WEEKDAY
    case /^([0-9]|[0-2][0-9]|3[0-1])?[\/]{1}?([0-9]|[0-2][0-9]|3[0-1])$/.test(strMonth):
      return OPTION_DAY.STARTING_MONTH
    case containts(strWeekday, ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']):
      return OPTION_DAY.MANY_WEEKDAY
    case !isNaN(strMonth) || strMonth.includes(','):
      return OPTION_DAY.MANY_MONTH
    case strMonth === 'L':
      return OPTION_DAY.LAST_DAY_OF_MONTH
    case strMonth === 'LW':
      return OPTION_DAY.LAST_WORKING_DAY_OF_EVERY_MONTH
    case /^[1-7]?L$/.test(strWeekday):
      return OPTION_DAY.LAST_WEEKDAY_OF_MONTH
    case /^L?\-?([0-9]|[0-2][0-9]|3[0-1])$/.test(strMonth):
      return OPTION_DAY.DAYS_BEFORE_THE_END_OF_MONTH
    case /^([0-9]|[0-2][0-9]|3[0-1])?W$/.test(strMonth):
      return OPTION_DAY.MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH
    case /^[1-7]?[\#]{1}?[0-5]$/.test(strWeekday):
      return OPTION_DAY.NUMBER_X_WEEKDAY_OF_MONTH
    default:
      return OPTION_DAY.EVERY_WEEKDAY
  }
}

export function cronTabOption(stringValue) {
  switch (true) {
    case stringValue === '*':
      return OPTIONS.EVERY
    case stringValue.includes('/'):
      return OPTIONS.START
    case /^[0-9]*$/.test(stringValue) || stringValue.includes(',') || containts(strWeekday, ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']):
      return OPTIONS.MANY
    case stringValue.includes('-'):
      return OPTIONS.BETWEEN
    default:
      return OPTIONS.EVERY
  }
}