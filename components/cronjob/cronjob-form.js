import styled from 'styled-components'
import Tabs from 'common/tabs'
import CronTabGeneral from 'cronjob/crontab/general'
import CronTabDays from 'cronjob/crontab/days'
import { getTimeValues, MONTHS, getYears } from 'utils/date-values'
import { addCheckedValue } from 'utils/crontab'
import getDate from 'utils/get-date'
import TextField from '@material-ui/core/TextField'
import { useFormik } from 'formik'
import cronJobState from 'providers/cronjob-state'
import Select from 'common/select'
import PropTypes from 'prop-types'
import Button from 'common/button'

const FormStyled = styled.form`
  .submit {
    margin: 20px auto 0 auto;
    color: white;
  }
  .dates, .ids, .desc, .grid {
    grid-row-gap: 10px;
    grid-column-gap: 16px;
    display: grid;
  }
  .ids {
    margin: 10px 0;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 640px) {
    .dates {
      grid-template-columns: repeat(2, 1fr)
    }
  }
  @media screen and (min-width: 768px) {
    .submit {
      width: 200px;
    }
    .desc {
      grid-template-columns: 120px 1fr;
    }
  }
`

export default function CronJobForm(props) {
  const { cronjob, workflows, handleOnSubmit } = props
  const { id, created_at, updated_at, } = cronjob
  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: cronJobState(cronjob),
    onSubmit: handleOnSubmit,
    validate: (values) => {
      let errors = {}

      if (!values.name) {
        errors.name = 'Nombre es requerido'
      } else if (values.name.length < 5) {
        errors.name = 'Escribe por lo menos 5 caracteres'
      } else if (values.name.length >= 50) {
        errors.name = 'El nombre no puede tener más de 50 caracteres'
      }

      if (!values.description) {
        errors.description = 'La descripción es requerida'
      } else if (values.description.length < 5) {
        errors.description = 'Escribe por lo menos 5 caracteres'
      } else if (values.description.length >= 50) {
        errors.description = 'La descripción no puede tener más de 500 caracteres'
      }
      
      return errors
    }
  })
  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="grid">
        {id && (
          <>
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
              <Select
                variant="standard"
                label="Workflow id"
                value={values.workflow_id}
                onChange={handleChange}
                name="workflow_id"
                items={workflows}
              />
            </div>
          </>
        )}
        {!id && (
          <div className="grid">
            <Select
              variant="standard"
              label="Workflow id"
              value={values.workflow_id}
              onChange={handleChange}
              name="workflow_id"
              items={workflows}
            />
          </div>
        )}
        <div className="desc">
          <TextField
            required
            label="Nombre"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={!!errors.name}
            label={errors.name}
          />
          <TextField
            required
            label="Descripción"
            value={values.description}
            onChange={handleChange}
            name="description"
            error={!!errors.description}
            label={errors.description}
          />
        </div>
      </div>
      <p>Elige la periocidad</p>
      <Tabs options={[
        {
          title: 'Segundos',
          component: <CronTabGeneral
            cronState={values.seconds}
            values={addCheckedValue(values.seconds.value, ',', getTimeValues(0, 59), values.seconds.MANY)}
            base="segundo"
          />
        },
        {
          title: 'Minutos',
          component: <CronTabGeneral
            cronState={values.minutes}
            values={addCheckedValue(values.minutes.value, ',', getTimeValues(0, 59), values.minutes.MANY)}
            base="minuto"
          />
        },
        {
          title: 'Horas',
          component: <CronTabGeneral
            cronState={values.hours}
            values={addCheckedValue(values.hours.value, ',', getTimeValues(0, 23), values.hours.MANY)}
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
            values={addCheckedValue(values.month.value, ',', MONTHS, values.month.MANY)}
            base="Mes"
          />
        },
        {
          title: 'Años',
          component: <CronTabGeneral
            cronState={values.year}
            values={addCheckedValue(values.year.value, ',', getYears(), values.year.MANY)}
            base="Año"
          />
        }
      ]} />
      <div className="submit">
        <Button fullWidth type="submit">Enviar</Button>
      </div>
    </FormStyled>
  )
}

CronJobForm.propTypes = {
  cronjob: PropTypes.object.isRequired,
  workflows: PropTypes.array.isRequired,
  handleOnSubmit: PropTypes.func.isRequired 
}