import { Checkbox, FormGroup, Radio } from '@material-ui/core'
import { FormSecondStyled, SelectStyled, FormControlLabel } from './styles'
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
    <FormSecondStyled label={isNaN(items[0].tile) ? '120px' : '45px'}>
      <div className="center">
        <Radio
          checked={state.current === OPTIONS.EVERY}
          onChange={handleOption}
          value={OPTIONS.EVERY}
          name="seconds"
        />
        <span>Cada {base}</span> 
      </div>
      <div className="center">
        <Radio
          checked={state.current === OPTIONS.START}
          onChange={handleOption}
          value={OPTIONS.START}
        />
        <span>
          Cada
        </span>
        <SelectStyled
          disabled={state.current !== OPTIONS.START}
          value={state.START.split('/')[1] || items[0].value}
          onChange={handleChangeStart}
          name="one"
          items={items}
          required
        />
        <span>{base}(s) comenzando desde el {base}</span>
        <SelectStyled
          disabled={state.current !== OPTIONS.START}
          value={state.START.split('/')[0] || items[0].value}
          onChange={handleChangeStart}
          items={items}
          name="two"
          required
        />
      </div>
      <div className="center">
        <Radio
          checked={state.current === OPTIONS.MANY}
          onChange={handleOption}
          value={OPTIONS.MANY}
        />
        {base}s especificos (elige uno o muchos)
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
        <span>
          Cada {base} entre el {base}
        </span>
        <SelectStyled
          disabled={state.current !== OPTIONS.BETWEEN}
          value={state.BETWEEN.split('-')[0] || items[0].value}
          onChange={handleChangeBetween}
          name="one"
          items={items}
          required
        />
        y el {base}
        <SelectStyled
          disabled={state.current !== OPTIONS.BETWEEN}
          value={state.BETWEEN.split('-')[1] || items[0].value}
          onChange={handleChangeBetween}
          name="two"
          items={items}
          required
        />
      </div>
    </FormSecondStyled>
  )
}

FormSecond.propTypes = {
  cronState: PropTypes.shape({
    current: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    EVERY: PropTypes.string.isRequired,
    START: PropTypes.string.isRequired,
    MANY: PropTypes.string.isRequired,
    BETWEEN: PropTypes.string.isRequired
  }).isRequired,
  base: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired
}