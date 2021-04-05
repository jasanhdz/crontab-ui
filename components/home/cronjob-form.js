import styled from 'styled-components'
import Tabs from 'common/tabs'
import FormSecond from 'components/home/form-second'
import { getTimeValues, getMonths, getYears } from 'utils/date-values'
// import MaterialTextField from '@material-ui/core/TextField'


const FormStyled = styled.form`
  display: grid;
  grid-row-gap: 1rem;
  .scheduling {
    display: grid;
    grid-template-columns: repeat(5, 1fr)
    /* flex-wrap: nowrap; */
  }
`

function CronJobForm({ cronjob }) {
  const { id, name, description, created_at, updated_at, workflow_id, scheduling } = cronjob
  const cronTab = scheduling.split(' ')
  return (
    <FormStyled>
      <Tabs options={[
        {
          title: 'Segundos',
          id: 'seconds',
          component: <FormSecond base="segundo" items={getTimeValues(0, 59)} values={{ one: 2, two: 4 }} />
        },
        {
          title: 'Minutos',
          id: 'minutes',
          component: <FormSecond base="minuto" items={getTimeValues(0, 59)} values={{ one: 2, two: 4 }}  />
        },
        {
          title: 'Horas',
          id: 'hours',
          component: <FormSecond base="hora" items={getTimeValues(0, 23)} values={{ one: 2, two: 4 }}  />
        },
        {
          title: 'Dias',
          id: 'days',
          component: <p>Dias</p>
        },
        {
          title: 'Meses',
          id: 'months',
          component: <FormSecond base="mes" items={getMonths()} values={{ one: 'enero', two: 'marzo' }}  />
        },
        {
          title: 'Años',
          id: 'years',
          component: <FormSecond base="año" items={getYears()} values={{ one: '2021', two: '2021' }}  />
        },
      ]} />
      {/* <MaterialTextField
        label="ID"
        value={id}
        variant="outlined"
        disabled
      />
      <MaterialTextField
        label="creado en"
        value={getDate(created_at, 'string')}
        variant="outlined"
        disabled
      />
      <MaterialTextField
        label="ultima actualización"
        value={getDate(updated_at, 'string')}
        variant="outlined"
        disabled
      />
      <MaterialTextField
        label="Nombre"
        value={name}
        variant="outlined"
      />
      <MaterialTextField
        label="Descripción"
        value={description}
        variant="outlined"
      />
      <MaterialTextField
        label="Workflow id"
        value={workflow_id}
        variant="outlined"
      />
      <p>Elige la periocidad</p> */}
      {/* <Select
        label="Minutos"
        value={cronTab[0]}
        items={getTimeValues(0, 59)}
      /> */}
      {/* <div className="scheduling" >
      </div> */}
    </FormStyled>
  )
}

export default CronJobForm
