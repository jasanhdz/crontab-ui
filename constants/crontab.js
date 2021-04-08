export const OPTIONS = {
  EVERY:   'EVERT',
  START:   'START',
  MANY:    'MANY',
  BETWEEN: 'BETWEEN'
}

export const OPTION_DAY_KEYS = {
  OF_MONTH: 'OF_MONTH',
  OF_WEEKDAY: 'OF_WEEKDAY'
}

export const OPTION_DAY = {
  [OPTION_DAY_KEYS.OF_MONTH]: {
    STARTING_MONTH: 'startingMonth',
    MANY_MONTH: 'manyMonth',
    LAST_DAY_OF_MONTH: 'lastDayOfMonth',
    LAST_WORKING_DAY_OF_EVERY_MONTH: 'lastWorkingDayOfEveryMonth',
    DAYS_BEFORE_THE_END_OF_MONTH: 'daysBeforeTheEndOfMonth',
    MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH: 'MonFriClosestToDayOfTheMonth'
    
  },
  [OPTION_DAY_KEYS.OF_WEEKDAY]: {
    LAST_WEEKDAY_OF_MONTH: 'lastWeekdayOfMonth',
    NUMBER_X_WEEKDAY_OF_MONTH: 'numberXWeekDayOfMonth',
    EVERY_WEEKDAY: 'everyWeek',
    STARTING_WEEKDAY: 'startingWeek',
    MANY_WEEKDAY: 'manyWeek',
  }
}

export const OPTION_DAY_ALL = {
  ...OPTION_DAY.OF_MONTH,
  ...OPTION_DAY.OF_WEEKDAY
}

export const SECONDS = 'seconds'
export const MINUTES = 'minutes'
export const HOURS = 'hours'
export const MONTH = 'month'
export const YEAR  = 'year'
export const DAYOFMONTH = 'dayOfMonth'
export const DAYOFWEEK  = 'dayOfWeek'
 