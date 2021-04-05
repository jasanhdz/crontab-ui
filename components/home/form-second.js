import styled from 'styled-components'
import { Checkbox, FormControlLabel, FormGroup, Radio } from '@material-ui/core'
import { useState } from 'react'
import Select from 'common/select'
import useInputValue from 'hooks/use-input-value'

const SelectStyled = styled(Select)`
  margin: 0 10px;
  .MuiOutlinedInput-input {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`

const FormSecondStyled = styled.div`
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

export default function FormSecond({ items, base, values }) {
  const selectStart = useInputValue(1)
  const selectOneValue = useInputValue(values.one)
  const selectSecondValue = useInputValue(values.two)
  const [value, setValue] = useState('every')
  const [state, setState] = useState(items) 
  const handleChangeRadio = event => {
    setValue(event.target.value)
  }
  const handleChecked = (event, tile) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }
  return (
    <FormSecondStyled>
      <div className="center">
        <Radio
          checked={value === 'every'}
          onChange={handleChangeRadio}
          value="every"
          name="radio-button"
          inputProps={{ 'aria-label': 'A' }}
        />
        <spam>Cada {base}</spam> 
      </div>
      <div className="center">
        <Radio
          checked={value === 'starting'}
          onChange={handleChangeRadio}
          value="starting"
          name="radio-button"
          inputProps={{ 'aria-label': 'A' }}
        />
        <p>
          Cada
        </p>
        <SelectStyled
          disabled={value !== 'starting'}
          value={selectStart.value}
          onChange={selectStart.onChange}
          items={items.map((item, idx) => idx < (items.length - 1) && ({ value: idx + 1, tile: idx + 1 }))}
        />
        {base}(s) comenzando desde el {base}
        <SelectStyled
          disabled={value !== 'starting'}
          value={selectSecondValue.value}
          onChange={selectSecondValue.onChange}
          items={items}
        />
      </div>
      <div className="center">
      <Radio
        checked={value === 'many'}
        onChange={handleChangeRadio}
        value="many"
        name="radio-button"
        inputProps={{ 'aria-label': 'A' }}
      />
        <p>{base}s especificos (elige uno o muchos)</p>
        <FormGroup className="grid">
          {items.map(item => (
            <FormControlLabel
              control={<Checkbox disabled={value !== 'many'} onChange={handleChecked} name={item.tile} />}
              label={item.tile}
              value={item.value}
            />
          ))}
        </FormGroup>
      </div>
      <div className="center">
        <Radio
          checked={value === 'between'}
          onChange={handleChangeRadio}
          value="between"
          name="radio-button"
          inputProps={{ 'aria-label': 'A' }}
        />
        <p>
          Cada {base} entre el {base}
        </p>
        <SelectStyled
          disabled={value !== 'between'}
          value={selectOneValue.value}
          onChange={selectOneValue.onChange}
          items={items}
        />
        y el {base}
        <SelectStyled
          disabled={value !== 'between'}
          value={selectSecondValue.value}
          onChange={selectSecondValue.onChange}
          items={items}
        />
      </div>
    </FormSecondStyled>
  )
}