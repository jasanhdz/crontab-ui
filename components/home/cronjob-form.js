import styled from 'styled-components'
import Tabs from 'common/tabs'
import CronTabGeneral from 'components/home/crontab/general'
import CronTabDays from 'components/home/crontab/days'
import { getTimeValues, getMonths, getYears, addCheckedValue } from 'utils/date-values'
import getDate from 'utils/get-date'
import MaterialTextField from '@material-ui/core/TextField'
import { updateCronJob } from 'services/cronjob'
import { getCookies } from 'utils/cookies'
import { useFormik } from 'formik'
import cronJobState from 'providers/cronjob-state'
import { OPTION_DAY, OPTIONS } from 'constants/crontab'

const FormStyled = styled.form`
  width: 100%;
  .cols-4 {
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(2, 100px) repeat(2, 1fr);
    grid-column-gap: 10px;
  }
  .cols-2 {
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: 120px 1fr;
    grid-column-gap: 10px;
  }
`

function CronJobForm({ cronjob, setCronJob }) {
  const { id, created_at, updated_at,  name, description, workflow_id, scheduling } = cronjob
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
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
    },
    onSubmit: values => {
      const { seconds, minutes, hours, days, month, year } = values
      // console.log('SECONDS: ', values.seconds.value)
      // console.log('MINUTES: ', values.minutes.value)
      // console.log('HOURS: ', values.hours.value)
      // console.log('OF_MONTH: ', values.days.OF_MONTH.value)
      // console.log('MONTH: ', values.month.value)
      // console.log('OF_WEEKDAY: ', values.days.OF_WEEKDAY.value)
      // console.log('YEAR: ', values.year.value)

      const scheduling = `${seconds.value} ${minutes.value} ${hours.value} ${days.OF_MONTH.value} ${month.value} ${days.OF_WEEKDAY.value} ${year.value}`
      console.log(scheduling)
    }
  })
  return (
    <FormStyled onSubmit={handleSubmit} >
      <div className="cols-4">
        <MaterialTextField
          label="ID"
          value={id}
          disabled
        />
        <MaterialTextField
          label="Workflow id"
          value={values.workflow_id}
          onChange={handleChange}
          name="workflow_id"
        />
        <MaterialTextField
          label="creado en"
          value={getDate(created_at)}
          disabled
        />
        <MaterialTextField
          label="ultima actualización"
          value={getDate(updated_at)}
          disabled
          style={{ transition: 500 }}
        />
      </div>
      <div className="cols-2">
        <MaterialTextField
          label="Nombre"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <MaterialTextField
          label="Descripción"
          value={values.description}
          onChange={handleChange}
          name="description"
        />
      </div>
      <div>
        <p>Elige la periocidad</p>
        <Tabs options={[
          {
            title: 'Segundos',
            component: <CronTabGeneral
              initialState={values.seconds}
              values={addCheckedValue(values.seconds.MANY, ',', getTimeValues(0, 59))}
              base="segundo"
            />
          },
          {
            title: 'Minutos',
            component: <CronTabGeneral
              initialState={values.minutes}
              values={addCheckedValue(values.minutes.MANY, ',', getTimeValues(0, 59))}
              base="minuto"
            />
          },
          {
            title: 'Horas',
            component: <CronTabGeneral
              initialState={values.hours}
              values={addCheckedValue(values.hours.MANY, ',', getTimeValues(0, 23))}
              base="hora"
            />
          },
          {
            title: 'Dias',
            component: <CronTabDays
              option={values.days}
              handleChange={handleChange}
              scheduling={values.scheduling}
            />
          },
          {
            title: 'Meses',
            component: <CronTabGeneral
              initialState={values.month}
              values={addCheckedValue(values.month.MANY, ',', getMonths())}
              base="Mes"
            />
          },
          {
            title: 'Años',
            component: <CronTabGeneral
              initialState={values.year}
              values={addCheckedValue(values.year.MANY, ',', getYears())}
              base="Año"
            />
          }
        ]} />
      </div>
      <button type="submit">Enviar</button>
    </FormStyled>
  )
}

export default CronJobForm
