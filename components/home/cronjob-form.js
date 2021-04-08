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
import { OPTION_DAY } from 'constants/crontab'
import { useFormik } from 'formik'

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
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      name,
      description,
      workflow_id,
      option: {
        currentDays: OPTION_DAY.OF_WEEKDAY.EVERY_WEEKDAY,
        OF_MONTH: {
          value: '?',
          [OPTION_DAY.OF_MONTH.STARTING_MONTH]: '31/14',
          [OPTION_DAY.OF_MONTH.MANY_MONTH]: '2,14',
          [OPTION_DAY.OF_MONTH.LAST_DAY_OF_MONTH]: 'L',
          [OPTION_DAY.OF_MONTH.LAST_WORKING_DAY_OF_EVERY_MONTH]: 'LW',
          [OPTION_DAY.OF_MONTH.DAYS_BEFORE_THE_END_OF_MONTH]: 'L-1',
          [OPTION_DAY.OF_MONTH.MONFRI_CLOSEST_TO_DAY_OF_THE_MONTH]: '20W',
        },
        OF_WEEKDAY: {
          value: '*',
          [OPTION_DAY.OF_WEEKDAY.LAST_WEEKDAY_OF_MONTH]: '4L',
          [OPTION_DAY.OF_WEEKDAY.EVERY_WEEKDAY]: '*',
          [OPTION_DAY.OF_WEEKDAY.STARTING_WEEKDAY]: '6/3',
          [OPTION_DAY.OF_WEEKDAY.MANY_WEEKDAY]: 'SUN,MON,TUE,WED,THU,FRI,SAT',
          [OPTION_DAY.OF_WEEKDAY.NUMBER_X_WEEKDAY_OF_MONTH]: '7#5',
        }
      },
    },
    onSubmit: values => {
      console.log('current: ', values.option.currentDays)
      console.log(values.option.OF_MONTH.value, values.option.OF_WEEKDAY.value)
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
          // {
          //   title: 'Segundos',
          //   component: <CronTabGeneral
          //     name={constants.SECONDS}
          //     base="segundo"
          //     rawItems={getTimeValues(0, 59)}
          //     values={values.seconds}
          //     handleValues={handleValues}
          //   />
          // },
          // {
          //   title: 'Minutos',
          //   component: <CronTabGeneral
          //     name={constants.MINUTES}
          //     base="minuto"
          //     rawItems={getTimeValues(0, 59)}
          //     values={values.minutes}
          //     handleValues={handleValues}
          //   />
          // },
          // {
          //   title: 'Horas',
          //   component: <CronTabGeneral
          //     name={constants.HOURS}
          //     base="hora"
          //     rawItems={getTimeValues(0, 23)}
          //     values={values.hours}
          //     handleValues={handleValues}
          //   />
          // },
          {
            title: 'Dias',
            component: <CronTabDays
              option={values.option}
              handleChange={handleChange}
              scheduling={values.scheduling}
              // handleValues={handleValues}
            />
          },
          // {
          //   title: 'Meses',
          //   component: <CronTabGeneral
          //     name={constants.MONTH}
          //     base="mes"
          //     rawItems={getMonths()}
          //     values={values.month}
          //     handleValues={handleValues}
          //   />
          // },
          // {
          //   title: 'Años',
          //   component: <CronTabGeneral
          //     name={constants.YEAR}
          //     base="año"
          //     rawItems={getYears()}
          //     values={values.year}
          //     handleValues={handleValues}
          //   />
          // }
        ]} />
      </div>
      <button type="submit">Enviar</button>
    </FormStyled>
  )
}

export default CronJobForm
