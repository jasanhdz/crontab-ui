import styled from 'styled-components'
import Select from 'common/select'
import { FormControlLabel as FormControlMaterial, FormGroup, Radio } from '@material-ui/core'

export const SelectStyled = styled(Select)`
  margin: 0 10px;
  .MuiOutlinedInput-input {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`

const FormSecond= styled.div`
  .center {
    padding: 5px 0;
    display: flex;
    align-items:center;
    flex-wrap: wrap;
    border-bottom: 1px solid rgba(0, 0, 0, 0.35);
  }
  .grid, .grid-days {
    width: 100%;
    padding: 0 10px;
    display: grid;
    grid-column-gap: 20px;
  }
  .grid-days {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr))
  }
  .grid {
    ${({ label }) => label && `grid-template-columns: repeat(auto-fit, minmax(${label}, 1fr))`};
  }
`

export function FormSecondStyled({ children, ...props }) {
  return <FormSecond {...props}>{children}</FormSecond>
}


export const FormControlLabel = styled(FormControlMaterial)`
  
  /* align-items: center;
  margin-right: 10px;

  .MuiButtonBase-root {
    padding: 3px;
  } */
`