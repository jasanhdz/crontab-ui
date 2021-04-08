import { OPTION_DAY, OPTIONS } from 'constants/crontab'

function createState(cronJob) {
  const { name, description, workflow_id, scheduling } = cronJob
  const cron = scheduling.split(' ')
  return {
    name,
    description,
    workflow_id,
    days: {
      current: OPTION_DAY.OF_WEEKDAY.EVERY_WEEKDAY,
      OF_MONTH: {
        value: '?',
        STARTING_MONTH: '31/14',
        MANY_MONTH: '2,14',
        LAST_DAY_OF_MONTH: 'L',
        LAST_WORKING_DAY_OF_EVERY_MONTH: 'LW',
        DAYS_BEFORE_THE_END_OF_MONTH: 'L-1',
        MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH: '20W',
      },
      OF_WEEKDAY: {
        value: '*',
        LAST_WEEKDAY_OF_MONTH: '4L',
        EVERY_WEEKDAY: '*',
        STARTING_WEEKDAY: '6/3',
        MANY_WEEKDAY: 'SUN,MON,TUE,WED,THU,FRI,SAT',
        NUMBER_X_WEEKDAY_OF_MONTH: '7#5',
      },
    },
    seconds: {
      current: OPTIONS.EVERY,
      value: '*',
      EVERY: '*',
      START: '0/1',
      MANY: '0,1',
      BETWEEN: '0-0'
    },
    minutes: {
      current: OPTIONS.EVERY,
      value: '*',
      EVERY: '*',
      START: '0/1',
      MANY: '0,1',
      BETWEEN: '0-0'
    },
    hours: {
      current: OPTIONS.EVERY,
      value: '*',
      EVERY: '*',
      START: '0/1',
      MANY: '0,1',
      BETWEEN: '0-0'
    },
    month: {
      current: OPTIONS.EVERY,
      value: '*',
      EVERY: '*',
      START: '0/1',
      MANY: '0,1',
      BETWEEN: '0-0'
    },
    year: {
      current: OPTIONS.EVERY,
      value: '*',
      EVERY: '*',
      START: '0/1',
      MANY: '0,1',
      BETWEEN: '0-0'
    }
  }
}

export default createState