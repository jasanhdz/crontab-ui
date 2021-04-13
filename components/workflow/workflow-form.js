import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Button from 'common/button'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'

const FormStyled = styled.form`
  display: grid;
  grid-row-gap: 12px;
  .dates {
    display: inherit;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
  }
  .textarea {
    resize: none;
    padding: 18.5px 14px;
    font-size: 1rem;
    font-family: var(--primaryFont);
    outline: 0;
    border-radius: 4px;
    &::placeholder {
      font-family: var(--primaryFont);
    }
    &:focus {
      border-color: var(--primary);
      border-width: 2px;
    }
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
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      name: workflow.name,
      description: workflow.description,
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
      />
      <TextareaAutosize
        required
        className="textarea"
        variant="outlined"
        placeholder="Escribe una descripción"
        rowsMin={5}
        rowsMax={8}
        value={values.description}
        onChange={handleChange}
        name="description"
      />
      <div className="submit">
        <Button fullWidth>Enviar</Button>
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
  onSubmit: PropTypes.func.isRequired
}