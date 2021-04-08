import { Checkbox, FormControlLabel, FormGroup, Radio } from '@material-ui/core'
import { useState } from 'react'
import { FormSecondStyled, SelectStyled } from './styles'
import { addCheckedValue, cronTabOption } from 'utils/date-values'
import useCronTabOption from 'hooks/use-crontab-option'
import { getSplitValues } from 'utils/crontab'
import { OPTIONS } from 'constants/crontab'

export default function FormSecond({ rawItems, base, name, values, handleValues }) {
  const [items, setItems] = useState(addCheckedValue(values, ',', rawItems))
  const handleChecked = (event) => {
    items[event.target.name].checked = event.target.checked
    setItems([...items])
    const data = items.filter(item => item.checked).map(item => item.value)
    handleValues(name, data.toString() || '*')
  }
  const selectStart = useCronTabOption(getSplitValues(values, '/', items, true), name, handleValues, true)
  const selectBetween = useCronTabOption(getSplitValues(values, '-', items), name, handleValues)
  const [option, setOption] = useState(cronTabOption(values))
  const handleChangeOption = event => {
    setOption(event.target.value)
    switch (event.target.value) {
      case OPTIONS.EVERY:
        return handleValues(name, '*')
      case OPTIONS.START:
        return handleValues(name, `${selectStart.one}/${selectStart.two}`)
      case OPTIONS.MANY:
        const data = items.filter(item => item.checked).map(item => item.value)
        return handleValues(name, data.toString() || '*')
      case OPTIONS.MANY:
        return handleValues(name, `*/${selectBetween.one}-${selectBetween.two}`)
      default:
        return handleValues(name, '*')
    }
  }
  return (
    <FormSecondStyled>
      <div className="center">
        <Radio
          checked={option === 'every'}
          onChange={handleChangeOption}
          value="every"
          name="seconds"
          inputProps={{ 'aria-label': 'A' }}
        />
        <spam>Cada {base}</spam> 
      </div>
      <div className="center">
        <Radio
          checked={option === 'starting'}
          onChange={handleChangeOption}
          value="starting"
          inputProps={{ 'aria-label': 'B' }}
        />
        <p>
          Cada
        </p>
        <SelectStyled
          disabled={option !== 'starting'}
          value={selectStart.one}
          onChange={(event) => selectStart.onChange(event, 'one')}
          items={items.map((item, idx) => idx < (items.length - 1) && ({ value: idx + 1, tile: idx + 1 }))}
        />
        {base}(s) comenzando desde el {base}
        <SelectStyled
          disabled={option !== 'starting'}
          value={selectStart.two}
          onChange={(event) => selectStart.onChange(event, 'two')}
          items={items}
        />
      </div>
      <div className="center">
      <Radio
        checked={option === 'many'}
        onChange={handleChangeOption}
        value="many"
        inputProps={{ 'aria-label': 'C' }}
      />
        <p>{base}s especificos (elige uno o muchos)</p>
        <FormGroup className="grid">
          {items.map((item, idx) => (
            <FormControlLabel
              label={item.tile}
              key={idx}
              control={<Checkbox
                disabled={option !== 'many'}
                checked={item.checked}
                onChange={handleChecked}
                value={item.value}
                name={idx.toString()}
              />}
            />
          ))}
        </FormGroup>
      </div>
      <div className="center">
        <Radio
          checked={option === 'between'}
          onChange={handleChangeOption}
          value="between"
          inputProps={{ 'aria-label': 'D' }}
        />
        <p>
          Cada {base} entre el {base}
        </p>
        <SelectStyled
          disabled={option !== 'between'}
          value={selectBetween.one}
          onChange={(event) => selectBetween.onChange(event, 'one')}
          items={items}
        />
        y el {base}
        <SelectStyled
          disabled={option !== 'between'}
          value={selectBetween.two}
          onChange={(event) => selectBetween.onChange(event, 'two')}
          items={items}
        />
      </div>
    </FormSecondStyled>
  )
}