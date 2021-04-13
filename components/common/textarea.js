import TextareaAutosizeMaterial from '@material-ui/core/TextareaAutosize'
import InputLabel from '@material-ui/core/InputLabel'
import styled from 'styled-components'

const TextAreaStyled = styled.div`
  display: grid;
  .textarea {
    resize: none;
    padding: 18.5px 14px;
    font-size: 1rem;
    font-family: var(--primaryFont);
    outline: 0;
    border-radius: 4px;
    border-color: ${({ error }) => error ? '#f44336' : 'var(--primary)'};
    &::placeholder {
      font-family: var(--primaryFont);
    }
    &:focus {
      border-color: ${({ error }) => error ? '#f44336' : 'var(--primary)'};
      border-width: 2px;
    }
  }
  .label {
    padding-top: 0.5rem;
    padding-left: 1rem;
    font-size: 12px;
    color: red;
  }
`


export default function TextareaAutosize(props) {
  const { error, label, ...otherProps } = props
  return (
    <TextAreaStyled error={error}>
      <TextareaAutosizeMaterial
        className="textarea"
        {...otherProps}
      />
      {label && <InputLabel className="label" color={error ? 'secondary' : 'primary'} >{label}</InputLabel>}
    </TextAreaStyled>
  )
}