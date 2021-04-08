import { useState } from 'react'
import { OPTIONS } from 'constants/crontab'

export default function useCronTab(initialState, values) {
  const [items, setItems] = useState(values)
  const [state, setState] = useState(initialState)
  const handleOption = event => {
    const value = event.target.value
    state.current = value
    console.log(value)
    switch (value) {
      case OPTIONS.EVERY:
        state.value = state.EVERY
        console.log(state.EVERY)
        break
      case OPTIONS.START:
        state.value = state.START
        console.log(state.START)
        break
      case OPTIONS.MANY:
        state.value = state.MANY
        console.log(state.MANY)
        break
      case OPTIONS.BETWEEN:
        state.value = state.BETWEEN
        console.log(state.BETWEEN)
        break
    }
    setState({ ...state })
  }
  const handleChangeStart = event => {
    const current = state.START.split('/')
    const value = event.target.value
    const name = event.target.name
    if (name === 'one') {
      current[1] = value
    } else {
      current[0] = value
    }
    state.START = `${current[0]}/${current[1]}`
    setState({ ...state })
  }
  const handleChangeItems = event => {
    items[event.target.name].checked = event.target.checked
    setItems([...items])
    const data = items.filter(item => item.checked).map(item => item.value)
    state.MANY = data.toString()
    setState({ ...state })
  }

  const handleChangeBetween = event => {
    const current = state.BETWEEN.split('-')
    const value = event.target.value
    const name = event.target.name
    if (name === 'one') {
      current[0] = value
    } else {
      current[1] = value
    }
    state.BETWEEN = `${current[0]}-${current[1]}`
    setState({ ...state })
  }

  return { 
    items,
    state,
    handleOption,
    handleChangeStart,
    handleChangeItems,
    handleChangeBetween
  }
}