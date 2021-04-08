import { useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup, Radio } from '@material-ui/core'
import { FormSecondStyled, SelectStyled } from './styles'
import { cronTabOptionMonthOrWeekday } from 'utils/crontab'
import { OPTION_DAY } from 'constants/crontab'
import { addCheckedValue, getDays, getDaysOfTheMonth, getTimeValues } from 'utils/date-values'

export default function CronTabDays({ dayOfMonth, dayOfWeek, handleValues }) {
  const [option, setOption] = useState(cronTabOptionMonthOrWeekday(dayOfMonth, dayOfWeek))
  const handleChangeOption = event => setOption(event.target.value)
  const [days, setDays] = useState(addCheckedValue(dayOfWeek, ',', getDays()))
  const handleCheckedDays = event => {
    days[event.target.name].checked = event.target.checked
    setDays([...days ])
  }
  const [daysOfMonth, setDaysOfMonth] = useState(addCheckedValue(dayOfMonth, ',', getTimeValues(1, 31)))
  const handleCheckedDaysOfMonth = event => {
    daysOfMonth[event.target.name].checked = event.target.checked
    setDaysOfMonth([...daysOfMonth ])
  }
  return (
    <FormSecondStyled>
      <div className="center">
        <Radio
          checked={option === OPTION_DAY.EVERY_WEEKDAY}
          onChange={handleChangeOption}
          value={OPTION_DAY.EVERY_WEEKDAY}
          name="seconds"
        />
        <spam>Cada Dia</spam> 
      </div>
      <div className="center">
        <Radio
          checked={option === OPTION_DAY.STARTING_WEEKDAY}
          onChange={handleChangeOption}
          value={OPTION_DAY.STARTING_WEEKDAY}
        />
        <p>Cada</p>
        <SelectStyled
          disabled={option !== OPTION_DAY.STARTING_WEEKDAY}
          items={getTimeValues(1, 7)}
        />
        Dia(s) a partir del 
        <SelectStyled
          disabled={option !== OPTION_DAY.STARTING_WEEKDAY}
          items={getDays()}
        /> del mes
      </div>
      <div className="center">
        <Radio
          checked={option === OPTION_DAY.STARTING_MONTH}
          onChange={handleChangeOption}
          value={OPTION_DAY.STARTING_MONTH}
        />
        Cada 
        <SelectStyled
          disabled={option !== OPTION_DAY.STARTING_MONTH}
          items={getTimeValues(1, 31)}
        />
        día(s) apartir del 
        <SelectStyled
          disabled={option !== OPTION_DAY.STARTING_MONTH}
          items={getDaysOfTheMonth()}
        /> 
        del mes
      </div>
      <div className="center">
        <Radio
          checked={option === OPTION_DAY.MANY_WEEKDAY}
          onChange={handleChangeOption}
          value={OPTION_DAY.MANY_WEEKDAY}
        />
        <p>Día específico de la semana (elija uno o varios)</p>
        <FormGroup className="grid">
          {days.map((item, idx) => (
            <FormControlLabel
              label={item.tile}
              key={idx}
              control={<Checkbox
                disabled={option !== OPTION_DAY.MANY_WEEKDAY}
                checked={item.checked}
                onChange={handleCheckedDays}
                value={item.value}
                name={idx.toString()}
              />}
            />
          ))}
        </FormGroup>
      </div>
      <div className="center">
        <Radio
          checked={option === OPTION_DAY.MANY_MONTH}
          onChange={handleChangeOption}
          value={OPTION_DAY.MANY_MONTH}
        />
        <p>Día específico del mes (elija uno o varios)</p>
        <FormGroup className="grid">
          {daysOfMonth.map((item, idx) => (
            <FormControlLabel
              label={item.tile}
              key={idx}
              control={<Checkbox
                disabled={option !== OPTION_DAY.MANY_MONTH}
                checked={item.checked}
                onChange={handleCheckedDaysOfMonth}
                value={item.value}
                name={idx.toString()}
              />}
            />
          ))}
        </FormGroup>
      </div>
      <div className="center">
        <Radio
          checked={option === OPTION_DAY.LAST_DAY_OF_MONTH}
          onChange={handleChangeOption}
          value={OPTION_DAY.LAST_DAY_OF_MONTH}
        />
        El último día del mes
      </div>
      <div className="center">
        <Radio
          checked={option === OPTION_DAY.LAST_WORKING_DAY_OF_EVERY_MONTH}
          onChange={handleChangeOption}
          value={OPTION_DAY.LAST_WORKING_DAY_OF_EVERY_MONTH}
        />
        El último día de la semana del mes
      </div>
      <div className="center">
        <Radio
          checked={option === OPTION_DAY.LAST_WEEKDAY_OF_MONTH}
          onChange={handleChangeOption}
          value={OPTION_DAY.LAST_WEEKDAY_OF_MONTH}
        />
        El último día 
        <SelectStyled
          disabled={option !== OPTION_DAY.LAST_WEEKDAY_OF_MONTH}
          items={getDays()}
        />
        del mes
      </div>
      <div className="center">
        <Radio
          checked={option === OPTION_DAY.DAYS_BEFORE_THE_END_OF_MONTH}
          onChange={handleChangeOption}
          value={OPTION_DAY.DAYS_BEFORE_THE_END_OF_MONTH}
        />
        <SelectStyled
          disabled={option !== OPTION_DAY.DAYS_BEFORE_THE_END_OF_MONTH}
          items={getTimeValues(1, 31)}
        />
        dia(s) antes del fin del mes
      </div>
      <div className="center">
        <Radio
          checked={option === OPTION_DAY.MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH}
          onChange={handleChangeOption}
          value={OPTION_DAY.MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH}
        />
        Dia de la semana (Lunes a Viernes) más cercano al
        <SelectStyled
          disabled={option !== OPTION_DAY.MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH}
          items={getDaysOfTheMonth()}
        />
        del mes
      </div>
      <div className="center">
        <Radio
          checked={option === OPTION_DAY.NUMBER_X_WEEKDAY_OF_MONTH}
          onChange={handleChangeOption}
          value={OPTION_DAY.NUMBER_X_WEEKDAY_OF_MONTH}
        /> En el 
        <SelectStyled
          disabled={option !== OPTION_DAY.NUMBER_X_WEEKDAY_OF_MONTH}
          items={getDaysOfTheMonth().slice(0, 5)}
        />
        <SelectStyled
          disabled={option !== OPTION_DAY.NUMBER_X_WEEKDAY_OF_MONTH}
          items={getDays()}
        />
        del mes
      </div>
    </FormSecondStyled>
  )
}