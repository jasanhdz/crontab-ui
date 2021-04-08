import styled from 'styled-components'
import Select from 'common/select'

export const SelectStyled = styled(Select)`
  margin: 0 10px;
  .MuiOutlinedInput-input {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`

export const FormSecondStyled = styled.div`
  .center {
    padding: 5px 0;
    display: flex;
    align-items:center;
    flex-wrap: wrap;
    border-bottom: 1px solid rgba(0, 0, 0, 0.35);
  }
  .grid {
    width: 100%;
    padding: 0 10px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-column-gap: 20px;
  }
`