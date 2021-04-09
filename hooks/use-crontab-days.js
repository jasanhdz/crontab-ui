import { useState } from 'react'
import { OPTION_DAY_ALL as OPTION } from 'constants/crontab'
import { DAYS, getTimeValues } from 'utils/date-values'
import { addCheckedValue } from 'utils/crontab'

export default function useCronTabDays(initialState) {
  const [manyWeekenday, setManyWeekenday] = useState(addCheckedValue(initialState.OF_WEEKDAY.MANY_WEEKDAY, ',', DAYS))
  const [daysOfMonth, setDaysOfMonth] = useState(addCheckedValue(initialState.OF_MONTH.MANY_MONTH, ',', getTimeValues(1, 31)))
  const [state, setState] = useState(initialState)
  const onChange = event => {
    const value = event.target.value
    state.current = value
    switch (value) {
      case OPTION.EVERY_WEEKDAY:
        state.OF_WEEKDAY.value = state.OF_WEEKDAY.EVERY_WEEKDAY
        state.OF_MONTH.value = '?'
        break
      case OPTION.STARTING_WEEKDAY:
        state.OF_WEEKDAY.value = state.OF_WEEKDAY.STARTING_WEEKDAY
        state.OF_MONTH.value = '?'
        break
      case OPTION.STARTING_MONTH:
        state.OF_MONTH.value = state.OF_MONTH.STARTING_MONTH
        state.OF_WEEKDAY.value = '?'
        break
      case OPTION.MANY_WEEKDAY:
        state.OF_WEEKDAY.value = state.OF_WEEKDAY.MANY_WEEKDAY
        state.OF_MONTH.value = '?'
        break
      case OPTION.MANY_MONTH:
        state.OF_MONTH.value = state.OF_MONTH.MANY_MONTH
        state.OF_WEEKDAY.value = '?'
        break
      case OPTION.LAST_DAY_OF_MONTH:
        state.OF_MONTH.value = state.OF_MONTH.LAST_DAY_OF_MONTH
        state.OF_WEEKDAY.value = '?'
        break
      case OPTION.LAST_WORKING_DAY_OF_EVERY_MONTH:
        state.OF_MONTH.value = state.OF_MONTH.LAST_WORKING_DAY_OF_EVERY_MONTH
        state.OF_WEEKDAY.value = '?'
        break
      case OPTION.LAST_WEEKDAY_OF_MONTH:
        state.OF_WEEKDAY.value = state.OF_WEEKDAY.LAST_WEEKDAY_OF_MONTH
        state.OF_MONTH.value = '?'
        break
      case OPTION.DAYS_BEFORE_THE_END_OF_MONTH:
        state.OF_MONTH.value = state.OF_MONTH.DAYS_BEFORE_THE_END_OF_MONTH
        state.OF_WEEKDAY.value = '?'
        break
      case OPTION.MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH:
        state.OF_MONTH.value = state.OF_MONTH.MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH
        state.OF_WEEKDAY.value = '?'
        break
      case OPTION.NUMBER_X_WEEKDAY_OF_MONTH:
        state.OF_WEEKDAY.value = state.OF_WEEKDAY.NUMBER_X_WEEKDAY_OF_MONTH
        state.OF_MONTH.value = '?'
        break
    } 
    setState({ ...state })
  }
  const handleChangeStartWeek = (event) => {
    const current = state.OF_WEEKDAY.STARTING_WEEKDAY.split('/')
    const name = event.target.name 
    if (name === 'one') {
      current[1] = event.target.value
    } else {
      current[0] = DAYS.lastIndexOf(event.target.value) + 1
    }
    state.OF_WEEKDAY.STARTING_WEEKDAY = `${current[0]}/${current[1]}`
    state.OF_WEEKDAY.value = `${current[0]}/${current[1]}`
    setState({ ...state })
  }
  const handleChangeStartMonth = event => {
    const current = state.OF_MONTH.STARTING_MONTH.split('/')
    const name = event.target.name
    if (name === 'one') {
      current[1] = event.target.value
    } else {
      current[0] = event.target.value
    }
    state.OF_MONTH.STARTING_MONTH = `${current[0]}/${current[1]}`
    state.OF_MONTH.value = `${current[0]}/${current[1]}`
    setState({ ...state })
  }
  const handleChangeManyWeekenday = event => {
    manyWeekenday[event.target.name].checked = event.target.checked
    setManyWeekenday([...manyWeekenday])
    const data = manyWeekenday.filter(item => item.checked).map(item => item.value)
    state.OF_WEEKDAY.MANY_WEEKDAY = data.toString()
    state.OF_WEEKDAY.value = data.toString()
    setState({ ...state })
  }
  const handleChangeManyMonth = event => {
    daysOfMonth[event.target.name].checked = event.target.checked
    setDaysOfMonth([...daysOfMonth ])
    const data = daysOfMonth.filter(item => item.checked).map(item => item.value)
    state.OF_MONTH.MANY_MONTH = data.toString()
    state.OF_MONTH.value = data.toString()
    setState({ ...state })
  }
  const handleChangeLastDayOfMonth = event => {
    state.OF_MONTH.LAST_DAY_OF_MONTH = 'L'
    state.OF_MONTH.value = 'L'
    setState({ ...state })
  }
  const handleChangeLastWeekdayOfMonth = event => {
    const value = `${DAYS.lastIndexOf(event.target.value) + 1}L`
    state.OF_WEEKDAY.LAST_WEEKDAY_OF_MONTH = value
    state.OF_WEEKDAY.value = value
    setState({ ...state })
  }
  const handleChangeDaysBeforeTheEndOfMonth = event => {
    const value = `L-${event.target.value}`
    state.OF_MONTH.DAYS_BEFORE_THE_END_OF_MONTH = value
    state.OF_MONTH.value = value
    setState({ ...state })
  }
  const handleChangeMonFriClosestToDay = event => {
    const value = `${event.target.value}W`
    state.OF_MONTH.MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH = value
    state.OF_MONTH.value = value
    setState({ ...state })  
  }
  const handleChangeNumberXWeekdayOfMonth = event => {
    const current = state.OF_WEEKDAY.NUMBER_X_WEEKDAY_OF_MONTH.split('#')
    const name = event.target.name
    if (name === 'one') {
      current[1] = event.target.value
    } else {
      current[0] = DAYS.lastIndexOf(event.target.value) + 1
    }
    state.OF_WEEKDAY.NUMBER_X_WEEKDAY_OF_MONTH = `${current[0]}#${current[1]}`
    state.OF_WEEKDAY.value = `${current[0]}#${current[1]}`
    setState({ ...state }) 
  }

  return {
    state,
    onChange,
    handleChangeStartWeek,
    handleChangeStartMonth,
    handleChangeManyWeekenday,
    handleChangeManyMonth,
    handleChangeLastDayOfMonth,
    handleChangeLastWeekdayOfMonth,
    handleChangeDaysBeforeTheEndOfMonth,
    handleChangeMonFriClosestToDay,
    handleChangeNumberXWeekdayOfMonth,
    manyWeekenday,
    daysOfMonth
  }
}
