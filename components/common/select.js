import { FormControl, InputLabel, MenuItem, Select as SelectMaterial } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const SelectStyled = styled(SelectMaterial)``

function Select({ variant, value, onChange, label, items, className, ...otherProps }) {
  return (
    <FormControl variant={variant} >
      <InputLabel id="select-outlined-label">{label}</InputLabel>
      <SelectStyled
        labelId="select-outlined-label"
        id="select-outlined"
        value={value}
        onChange={onChange}
        className={className}
        {...otherProps}
      >
      {/* <MenuItem value="*">
        <em>*</em>
      </MenuItem> */}
      {items.map((item, idx) => <MenuItem key={idx} value={item.value}>{item.tile}</MenuItem>)}
      </SelectStyled>
  </FormControl>
  )
}

Select.defaultProps = {
  variant: 'outlined',
  value: '',
  label: null,
  items: [],
}

export default Select
