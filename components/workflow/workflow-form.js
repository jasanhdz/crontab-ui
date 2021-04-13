import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from 'common/button'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import TextareaAutosize from 'common/textarea'

const FormStyled = styled.form`
  display: grid;
  grid-row-gap: 12px;
  .dates {
    display: inherit;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
  }
  .submit {
    width: 100%;
    color: white;
    margin: 20px auto 0 auto;
  }
  @media screen and (min-width: 768px) {
    .submit {
      width: 250px;
    }
  }
`

export default function WorkFlowForm(props) {
  const { workflow, onSubmit } = props
  const { id, created_at, updated_at } = workflow
  const { handleSubmit, handleChange, values, errors, isSubmitting } = useFormik({
    initialValues: {
      name: workflow.name,
      description: workflow.description,
    },  
    validate: (values) => {
      let errors = {}

      if (!values.name) {
        errors.name = 'Nombre es requerido'
      } else if (values.name.length >= 50) {
        errors.name = 'El nombre no puede tener más de 50 caracteres'
      }

      if (!values.description) {
        errors.description = 'La descripción es requerida'
      } else if (values.description.length >= 50) {
        errors.description = 'La descripción no puede tener más de 500 caracteres'
      }

      return errors
    },
    onSubmit: onSubmit
  })
  return (
    <FormStyled onSubmit={handleSubmit}>
      {id && (
        <>
          <div className="dates">
            <TextField
              variant="outlined"
              label="creado en:"
              disabled
              value={created_at}
            />
            <TextField
              variant="outlined"
              label="actualizado en:"
              disabled
              value={updated_at}
            />
          </div>
          <TextField
            variant="outlined"
            label="ID"
            disabled
            value={id}
          />
        </>
      )}
      <TextField
        required
        variant="outlined"
        label="Nombre"
        value={values.name}
        onChange={handleChange}
        name="name"
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextareaAutosize
        required
        variant="outlined"
        placeholder="Escribe una descripción"
        rowsMin={5}
        rowsMax={8}
        value={values.description}
        onChange={handleChange}
        name="description"
        error={!!errors.description}
        label={errors.description}
      />
      <div className="submit">
        <Button disabled={isSubmitting} type="submit" fullWidth>Enviar</Button>
      </div>
    </FormStyled>
  )
}

WorkFlowForm.propTypes = {
  workflow: PropTypes.shape({
    id: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
}