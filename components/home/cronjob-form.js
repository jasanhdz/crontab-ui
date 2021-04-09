import styled from 'styled-components'
import Tabs from 'common/tabs'
import CronTabGeneral from 'components/home/crontab/general'
import CronTabDays from 'components/home/crontab/days'
import { getTimeValues, MONTHS, getYears } from 'utils/date-values'
import { addCheckedValue } from 'utils/crontab'
import getDate from 'utils/get-date'
import MaterialTextField from '@material-ui/core/TextField'
import { updateCronJob } from 'services/cronjob'
import { getCookies } from 'utils/cookies'
import { useFormik } from 'formik'
import cronJobState from 'providers/cronjob-state'

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
  const { id, created_at, updated_at, } = cronjob
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: cronJobState(cronjob),
    onSubmit: async values => {
      const { seconds, minutes, hours, days, month, year, name, description, workflow_id } = values
      const scheduling = `${seconds.value || '*'} ${minutes.value || '*'} ${hours.value || '*'} ${days.OF_MONTH.value || '?'} ${month.value} ${days.OF_WEEKDAY.value || '*'} ${year.value || '*'}`
      console.log(scheduling)
      const { user_token: token } = getCookies()
      const data = {
        name,
        description,
        workflow_id,
        scheduling
      }
      const { payload } = await updateCronJob(token, id, data)
      console.log(payload)
      setCronJob({ ...payload })
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
              cronState={values.seconds}
              values={addCheckedValue(values.seconds.value, ',', getTimeValues(0, 59))}
              base="segundo"
            />
          },
          {
            title: 'Minutos',
            component: <CronTabGeneral
              cronState={values.minutes}
              values={addCheckedValue(values.minutes.value, ',', getTimeValues(0, 59))}
              base="minuto"
            />
          },
          {
            title: 'Horas',
            component: <CronTabGeneral
              cronState={values.hours}
              values={addCheckedValue(values.hours.value, ',', getTimeValues(0, 23))}
              base="hora"
            />
          },
          {
            title: 'Dias',
            component: <CronTabDays option={values.days} />
          },
          {
            title: 'Meses',
            component: <CronTabGeneral
              cronState={values.month}
              values={addCheckedValue(values.month.value, ',', MONTHS)}
              base="Mes"
            />
          },
          {
            title: 'Años',
            component: <CronTabGeneral
              cronState={values.year}
              values={addCheckedValue(values.year.value, ',', getYears())}
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
