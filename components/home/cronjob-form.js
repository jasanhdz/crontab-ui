import styled from 'styled-components'
import Tabs from 'common/tabs'
import CronTabGeneral from 'components/home/crontab/general'
import CronTabDays from 'components/home/crontab/days'
import { getTimeValues, MONTHS, getYears } from 'utils/date-values'
import { addCheckedValue } from 'utils/crontab'
import getDate from 'utils/get-date'
import TextField from '@material-ui/core/TextField'
import { updateCronJob } from 'services/cronjob'
import { getCookies } from 'utils/cookies'
import { useFormik } from 'formik'
import cronJobState from 'providers/cronjob-state'

const FormStyled = styled.form`
  .dates, .ids, .desc {
    grid-row-gap: 10px;
    grid-column-gap: 16px;
  }
  .dates {
    display: grid;
  }
  .ids {
    margin: 10px 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .desc {
    display: grid;
  }
  @media screen and (min-width: 640px) {
    .dates {
      grid-template-columns: repeat(2, 1fr)
    }
  }
  @media screen and (min-width: 768px) {
    .desc {
      grid-template-columns: 120px 1fr;
    }
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
    <FormStyled onSubmit={handleSubmit}>
      <div className="grid">
        <div className="dates">
          <TextField
            area="createdAt"
            label="creado en"
            value={getDate(created_at)}
            disabled
          />
          <TextField
            area="updatedAt"
            label="ultima actualización"
            value={getDate(updated_at)}
            disabled
            style={{ transition: 500 }}
          />
        </div>
        <div className="ids">
          <TextField
            area="id"
            label="ID"
            value={id}
            disabled
          />
          <TextField
            area="workId"
            label="Workflow id"
            value={values.workflow_id}
            onChange={handleChange}
            name="workflow_id"
          />
        </div>
        <div className="desc">
          <TextField
            label="Nombre"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          <TextField
            label="Descripción"
            value={values.description}
            onChange={handleChange}
            name="description"
          />
        </div>
      </div>
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
      <button type="submit">Enviar</button>
    </FormStyled>
  )
}

export default CronJobForm
