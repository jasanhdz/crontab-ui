import { Checkbox, FormControlLabel, FormGroup, Radio } from '@material-ui/core'
import { FormSecondStyled, SelectStyled } from './styles'
import useCronTab from 'hooks/use-crontab'
import PropTypes from 'prop-types'
import { OPTIONS } from 'constants/crontab'

export default function FormSecond({ cronState, base, values }) {
  const {
    state,
    items,
    handleOption,
    handleChangeStart,
    handleChangeItems,
    handleChangeBetween
  } = useCronTab(cronState, values)
  return (
    <FormSecondStyled>
      <div className="center">
        <Radio
          checked={state.current === OPTIONS.EVERY}
          onChange={handleOption}
          value={OPTIONS.EVERY}
          name="seconds"
        />
        <spam>Cada {base}</spam> 
      </div>
      <div className="center">
        <Radio
          checked={state.current === OPTIONS.START}
          onChange={handleOption}
          value={OPTIONS.START}
        />
        <p>
          Cada
        </p>
        <SelectStyled
          disabled={state.current !== OPTIONS.START}
          value={state.START.split('/')[1] || items[0].value}
          onChange={handleChangeStart}
          name="one"
          items={items}
        />
        {base}(s) comenzando desde el {base}
        <SelectStyled
          disabled={state.current !== OPTIONS.START}
          value={state.START.split('/')[0] || 2}
          onChange={handleChangeStart}
          items={items}
          name="two"
        />
      </div>
      <div className="center">
      <Radio
        checked={state.current === OPTIONS.MANY}
        onChange={handleOption}
        value={OPTIONS.MANY}
      />
        <p>{base}s especificos (elige uno o muchos)</p>
        <FormGroup className="grid">
          {items.map((item, idx) => (
            <FormControlLabel
              label={item.tile}
              key={idx}
              control={<Checkbox
                disabled={state.current !== OPTIONS.MANY}
                checked={item.checked}
                onChange={handleChangeItems}
                value={item.value}
                name={idx.toString()}
              />}
            />
          ))}
        </FormGroup>
      </div>
      <div className="center">
        <Radio
          checked={state.current === OPTIONS.BETWEEN}
          onChange={handleOption}
          value={OPTIONS.BETWEEN}
        />
        <p>
          Cada {base} entre el {base}
        </p>
        <SelectStyled
          disabled={state.current !== OPTIONS.BETWEEN}
          value={state.BETWEEN.split('-')[0] || 0}
          onChange={handleChangeBetween}
          name="one"
          items={items}
        />
        y el {base}
        <SelectStyled
          disabled={state.current !== OPTIONS.BETWEEN}
          value={state.BETWEEN.split('-')[1] || 0}
          onChange={handleChangeBetween}
          name="two"
          items={items}
        />
      </div>
    </FormSecondStyled>
  )
}

FormSecond.Proptypes = {
  initialState: PropTypes.shape({
    current: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    EVERY: PropTypes.string.isRequired,
    START: PropTypes.string.isRequired,
    MANY: PropTypes.string.isRequired,
    BETWEEN: PropTypes.string.isRequired
  }).isRequired,
  base: PropTypes.isRequired
}