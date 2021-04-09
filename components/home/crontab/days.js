import { Checkbox, FormControlLabel, FormGroup, Radio } from '@material-ui/core'
import { FormSecondStyled, SelectStyled } from './styles'
import { DAYS, getDaysOfTheMonth, getTimeValues } from 'utils/date-values'
import useCronTabDays from 'hooks/use-crontab-days'
import { OPTION_DAY_ALL as OPTION } from 'constants/crontab'

export default function CronTabDays({ option }) {
  const {
    state,
    onChange,
    handleChangeStartWeek,
    handleChangeStartMonth,
    handleChangeManyWeekenday,
    handleChangeManyMonth,
    handleChangeLastWeekdayOfMonth,
    handleChangeDaysBeforeTheEndOfMonth,
    handleChangeMonFriClosestToDay,
    handleChangeNumberXWeekdayOfMonth,
    manyWeekenday,
    daysOfMonth
  } = useCronTabDays(option)
  return (
    <FormSecondStyled label="45px">
      <div className="center">
        <Radio
          checked={state.current === OPTION.EVERY_WEEKDAY}
          onChange={onChange}
          value={OPTION.EVERY_WEEKDAY}
        />
        <span>Cada Dia</span> 
      </div>
      <div className="center">
        <Radio
          checked={state.current === OPTION.STARTING_WEEKDAY}
          onChange={onChange}
          value={OPTION.STARTING_WEEKDAY}
        />
        <p>Cada</p>
        <SelectStyled
          disabled={state.current !== OPTION.STARTING_WEEKDAY}
          items={getTimeValues(1, 7)}
          onChange={handleChangeStartWeek}
          value={state.OF_WEEKDAY.STARTING_WEEKDAY.split('/')[1] || 1}
          name="one"
        />
        Dia(s) a partir del 
        <SelectStyled
          disabled={state.current !== OPTION.STARTING_WEEKDAY}
          items={DAYS}
          onChange={handleChangeStartWeek}
          value={DAYS[state.OF_WEEKDAY.STARTING_WEEKDAY.split('/')[0] - 1] || DAYS[0].value}
          name="two"
        /> del mes
      </div>
      <div className="center">
        <Radio
          checked={state.current === OPTION.STARTING_MONTH}
          onChange={onChange}
          value={OPTION.STARTING_MONTH}
        />
        Cada 
        <SelectStyled
          disabled={state.current !== OPTION.STARTING_MONTH}
          items={getTimeValues(1, 31)}
          value={state.OF_MONTH.STARTING_MONTH.split('/')[1] || 1}
          onChange={handleChangeStartMonth}
          name="one"
        />
        día(s) apartir del 
        <SelectStyled
          disabled={state.current !== OPTION.STARTING_MONTH}
          items={getDaysOfTheMonth()}
          value={state.OF_MONTH.STARTING_MONTH.split('/')[0] || getDaysOfTheMonth()[0].value}
          onChange={handleChangeStartMonth}
          name="two"
        /> 
        del mes
      </div>
      <div className="center">
        <Radio
          checked={state.current === OPTION.MANY_WEEKDAY}
          onChange={onChange}
          value={OPTION.MANY_WEEKDAY}
        />
        <p>Día específico de la semana (elija uno o varios)</p>
        <FormGroup className="grid-days">
          {manyWeekenday.map((item, idx) => (
            <FormControlLabel
              label={item.tile}
              key={idx}
              control={<Checkbox
                disabled={state.current !== OPTION.MANY_WEEKDAY}
                checked={item.checked}
                onChange={handleChangeManyWeekenday}
                value={item.value}
                name={idx.toString()}
              />}
            />
          ))}
        </FormGroup>
      </div>
      <div className="center">
        <Radio
          checked={state.current === OPTION.MANY_MONTH}
          onChange={onChange}
          value={OPTION.MANY_MONTH}
        />
        <p>Día específico del mes (elija uno o varios)</p>
        <FormGroup className="grid">
          {daysOfMonth.map((item, idx) => (
            <FormControlLabel
              label={item.tile}
              key={idx}
              control={<Checkbox
                disabled={state.current !== OPTION.MANY_MONTH}
                checked={item.checked || idx === 0}
                onChange={handleChangeManyMonth}
                value={item.value}
                name={idx.toString()}
              />}
            />
          ))}
        </FormGroup>
      </div>
      <div className="center">
        <Radio
          checked={state.current === OPTION.LAST_DAY_OF_MONTH}
          onChange={onChange}
          value={OPTION.LAST_DAY_OF_MONTH}
        />
        El último día del mes
      </div>
      <div className="center">
        <Radio
          checked={state.current === OPTION.LAST_WORKING_DAY_OF_EVERY_MONTH}
          onChange={onChange}
          value={OPTION.LAST_WORKING_DAY_OF_EVERY_MONTH}
        />
        El último día de la semana del mes
      </div>
      <div className="center">
        <Radio
          checked={state.current === OPTION.LAST_WEEKDAY_OF_MONTH}
          onChange={onChange}
          value={OPTION.LAST_WEEKDAY_OF_MONTH}
        />
        El último día 
        <SelectStyled
          disabled={state.current !== OPTION.LAST_WEEKDAY_OF_MONTH}
          value={DAYS[state.OF_WEEKDAY.LAST_WEEKDAY_OF_MONTH.split('L')[0] - 1] || DAYS[1].value}
          onChange={handleChangeLastWeekdayOfMonth}
          items={DAYS}
        />
        del mes
      </div>
      <div className="center">
        <Radio
          checked={state.current === OPTION.DAYS_BEFORE_THE_END_OF_MONTH}
          onChange={onChange}
          value={OPTION.DAYS_BEFORE_THE_END_OF_MONTH}
        />
        <SelectStyled
          disabled={state.current !== OPTION.DAYS_BEFORE_THE_END_OF_MONTH}
          items={getTimeValues(1, 31)}
          onChange={handleChangeDaysBeforeTheEndOfMonth}
          value={state.OF_MONTH.DAYS_BEFORE_THE_END_OF_MONTH.split('-')[1] || 1}
        />
        dia(s) antes del fin del mes
      </div>
      <div className="center">
        <Radio
          checked={state.current === OPTION.MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH}
          onChange={onChange}
          value={OPTION.MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH}
        />
        Dia de la semana (Lunes a Viernes) más cercano al
        <SelectStyled
          disabled={state.current !== OPTION.MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH}
          value={state.OF_MONTH.MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH.split('W')[0] || 1}
          onChange={handleChangeMonFriClosestToDay}
          items={getDaysOfTheMonth()}
        />
        del mes
      </div>
      <div className="center">
        <Radio
          checked={state.current === OPTION.NUMBER_X_WEEKDAY_OF_MONTH}
          onChange={onChange}
          value={OPTION.NUMBER_X_WEEKDAY_OF_MONTH}
        /> En el 
        <SelectStyled
          disabled={state.current !== OPTION.NUMBER_X_WEEKDAY_OF_MONTH}
          value={state.OF_WEEKDAY.NUMBER_X_WEEKDAY_OF_MONTH.split('#')[1] || 1}
          items={getDaysOfTheMonth().slice(0, 5)}
          onChange={handleChangeNumberXWeekdayOfMonth}
          name="one"
        />
        <SelectStyled
          disabled={state.current !== OPTION.NUMBER_X_WEEKDAY_OF_MONTH}
          items={DAYS}
          value={DAYS[state.OF_WEEKDAY.NUMBER_X_WEEKDAY_OF_MONTH.split('#')[0] - 1] || DAYS[1].value}
          onChange={handleChangeNumberXWeekdayOfMonth}
          name="two"
        />
        del mes
      </div>'
    </FormSecondStyled>
  )
}