import styled from 'styled-components'
import Tabs from 'common/tabs'
import CronTabGeneral from 'components/home/crontab/general'
import CronTabDays from 'components/home/crontab/days'
import { getTimeValues, getMonths, getYears } from 'utils/date-values'
import getDate from 'utils/get-date'
import { useState } from 'react'
import MaterialTextField from '@material-ui/core/TextField'
import { updateCronJob } from 'services/cronjob'
import { getCookies } from 'utils/cookies'
import * as constants from 'constants/crontab'

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
  const { id, name, description, created_at, updated_at, workflow_id, scheduling } = cronjob
  const cron = scheduling.split(' ')
  const [values, setValues] = useState({
    name,
    description,
    workflow_id,
    seconds:    cron[0] || '*',
    minutes:    cron[1] || '*',
    hours:      cron[2] || '*',
    dayOfMonth: '?',
    month:      cron[4] || '*',
    dayOfWeek:  '*',
    year:       cron[6] || '*'
  })
  const handleChange = event => {
    setValues({...values, [event.target.name]: event.target.value })
  }
  const handleValues = (name, value) => {
    setValues({ ...values, [name]: value })
  }
  const handleSubmit = async event => {
    event.preventDefault()
    const { name, description, workflow_id, ...otherProps } = values
    const crontab = Object.values(otherProps).reduce((accum, current) => `${accum} ${current}`)
    console.log(crontab)
    // const { user_token: token } = getCookies()
    // const { payload } = await updateCronJob(token, id, {...otherProps, scheduling: crontab })
    // console.log(payload)
    // setCronJob({ ...payload })
  }
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
              name={constants.SECONDS}
              base="segundo"
              rawItems={getTimeValues(0, 59)}
              values={values.seconds}
              handleValues={handleValues}
            />
          },
          {
            title: 'Minutos',
            component: <CronTabGeneral
              name={constants.MINUTES}
              base="minuto"
              rawItems={getTimeValues(0, 59)}
              values={values.minutes}
              handleValues={handleValues}
            />
          },
          {
            title: 'Horas',
            component: <CronTabGeneral
              name={constants.HOURS}
              base="hora"
              rawItems={getTimeValues(0, 23)}
              values={values.hours}
              handleValues={handleValues}
            />
          },
          {
            title: 'Dias',
            component: <CronTabDays
              dayOfMonth={values.dayOfMonth}
              dayOfWeek={values.dayOfWeek}
              handleValues={handleValues}
            />
          },
          {
            title: 'Meses',
            component: <CronTabGeneral
              name={constants.MONTH}
              base="mes"
              rawItems={getMonths()}
              values={values.month}
              handleValues={handleValues}
            />
          },
          {
            title: 'Años',
            component: <CronTabGeneral
              name={constants.YEAR}
              base="año"
              rawItems={getYears()}
              values={values.year}
              handleValues={handleValues}
            />
          }
        ]} />
      </div>
      <button type="submit">Enviar</button>
    </FormStyled>
  )
}

export default CronJobForm
