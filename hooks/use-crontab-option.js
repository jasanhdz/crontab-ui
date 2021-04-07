import { useState } from 'react'

export default function useCronTabOption(values, name, handleValues, start) {
  const [state, setState] = useState(values)
  const onChange = (event, key) => {
    setState({ ...state, [key]: event.target.value })
    const one = key === 'one' ? event.target.value : state.one
    const two = key === 'two' ? event.target.value : state.two
    if(start) return handleValues(name, `${one}/${two}`)
    return handleValues(name, `*/${one}-${two}`)
  }
  return {
    one: state.one,
    two: state.two,
    onChange
  }
}
