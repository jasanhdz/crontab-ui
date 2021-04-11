import { cronTabOptionMonthOrWeekday, cronTabOption } from 'utils/crontab'

function createState(cronJob) {
  const { name, description, workflow_id, scheduling } = cronJob
  const cron = scheduling.split(' ')
  const seconds    = cron[0] || '*'
  const minutes    = cron[1] || '*'
  const hours      = cron[2] || '*'
  const dayOfMonth = cron[3] || '?'
  const month      = cron[4] || '*'
  const dayOfWeek  = cron[5] || '*'
  const year       = cron[6] || '*'
  
  return {
    name,
    description,
    workflow_id,
    days: {
      current: cronTabOptionMonthOrWeekday(dayOfMonth, dayOfWeek),
      OF_MONTH: {
        value: dayOfMonth,
        STARTING_MONTH: '1/1',
        MANY_MONTH: '1,2',
        LAST_DAY_OF_MONTH: 'L',
        LAST_WORKING_DAY_OF_EVERY_MONTH: 'LW',
        DAYS_BEFORE_THE_END_OF_MONTH: 'L-1',
        MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH: '1W',
      },
      OF_WEEKDAY: {
        value: dayOfWeek,
        LAST_WEEKDAY_OF_MONTH: '1L',
        EVERY_WEEKDAY: '*',
        STARTING_WEEKDAY: 'SUN/1',
        MANY_WEEKDAY: 'SUN,MON',
        NUMBER_X_WEEKDAY_OF_MONTH: '1#1',
      },
    },
    seconds: {
      current: cronTabOption(seconds),
      value: seconds,
      EVERY: '*',
      START: '0/1',
      MANY: '0,1',
      BETWEEN: '0-0'
    },
    minutes: {
      current: cronTabOption(minutes),
      value: minutes,
      EVERY: '*',
      START: '0/1',
      MANY: '0,1',
      BETWEEN: '0-0'
    },
    hours: {
      current: cronTabOption(hours),
      value: hours,
      EVERY: '*',
      START: '0/1',
      MANY: '0,1',
      BETWEEN: '0-0'
    },
    month: {
      current: cronTabOption(month),
      value: month,
      EVERY: '*',
      START: 'JAN/FEB',
      MANY: 'JAN,FEB',
      BETWEEN: 'JAN-MAY'
    },
    year: {
      current: cronTabOption(year),
      value: year,
      EVERY: '*',
      START: '2021/2022',
      MANY: '2021',
      BETWEEN: '2021-2024'
    }
  }
}

export default createState