import styled from 'styled-components'
import Tabs from 'common/tabs'
import FormSecond from 'components/home/form-second'
import { getTimeValues, getMonths, getYears } from 'utils/date-values'
import getDate from 'utils/get-date'
import { useState } from 'react'
import MaterialTextField from '@material-ui/core/TextField'
import { updateCronJob } from 'services/cronjob'
import { getCookies } from 'utils/cookies'

const FormStyled = styled.form`
  display: grid;
  grid-row-gap: 1rem;
  .cols-4 {
    display: grid;
    grid-template-columns: 120px repeat(2, 1fr) 120px;
    grid-column-gap: 10px;
  }
  .cols-2 {
    display: grid;
    grid-template-columns: 120px 1fr;
    grid-column-gap: 10px;
  }
`

function CronJobForm({ cronjob, setCronJob }) {
  const { id, name, description, created_at, updated_at, workflow_id, scheduling } = cronjob
  const cronTab = scheduling.split(' ')
  const [values, setValues] = useState({
    name,
    description,
    workflow_id,
    seconds: cronTab[0] || '*',
    minutes: cronTab[1] || '*',
    hours:   cronTab[2] || '*',
    days:    cronTab[3] || '*',
    months:  cronTab[4] || '*',
    years:   cronTab[5] || '2021,2022'
  })
  const handleChange = event => {
    setValues({...values, [event.target.name]: event.target.value })
  }
  const handleValues = (name, value) => {
    setValues({ ...values, [name]: value })
  }
  const handleSubmit = async event => {
    event.preventDefault()
    const { seconds, minutes, hours, days, months, years, ...otherProps } = values
    const crontab = `${seconds} ${minutes} ${hours} ${days} ${months} ${years}`
    const { user_token: token } = getCookies()
    const { payload: data } = await updateCronJob(token, id, {...otherProps, scheduling: crontab })
    setCronJob({ ...data })
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
        <MaterialTextField
          label="Workflow id"
          value={values.workflow_id}
          onChange={handleChange}
          name="workflow_id"
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
            component: <FormSecond
              name="seconds"
              base="segundo"
              rawItems={getTimeValues(0, 59)}
              values={values.seconds}
              handleValues={handleValues}
            />
          },
          {
            title: 'Minutos',
            component: <FormSecond
              name='minutes'
              base="minuto"
              rawItems={getTimeValues(0, 59)}
              values={values.minutes}
              handleValues={handleValues}
            />
          },
          {
            title: 'Horas',
            component: <FormSecond
              name='hours'
              base="hora"
              rawItems={getTimeValues(0, 23)}
              values={values.hours}
              handleValues={handleValues}
            />
          },
          {
            title: 'Dias',
            component: <p>Dias</p>
          },
          {
            title: 'Meses',
            component: <FormSecond
              name='months'
              base="mes"
              rawItems={getMonths()}
              values={values.months}
              handleValues={handleValues}
            />
          },
          {
            title: 'Años',
            component: <FormSecond
              name='years'
              base="año"
              rawItems={getYears()}
              values={values.years}
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
