import { useState } from 'react'
import { OPTIONS } from 'constants/crontab'

export default function useCronTab(cronState, values) {
  const [items, setItems] = useState(values)
  const [state, setState] = useState(cronState)
  const handleOption = event => {
    const value = event.target.value
    cronState.current = value
    switch (value) {
      case OPTIONS.EVERY:
        cronState.value = cronState.EVERY
        break
      case OPTIONS.START:
        cronState.value = cronState.START
        break
      case OPTIONS.MANY:
        cronState.value = cronState.MANY
        break
      case OPTIONS.BETWEEN:
        cronState.value = cronState.BETWEEN
        break
    }
    setState({ ...cronState })
  }
  const handleChangeStart = event => {
    const current = cronState.START.split('/')
    const value = event.target.value
    const name = event.target.name
    if (name === 'one') {
      current[1] = value
    } else {
      current[0] = value
    }
    cronState.START = `${current[0]}/${current[1]}`
    cronState.value = `${current[0]}/${current[1]}`
    setState({ ...cronState })
  }
  const handleChangeItems = event => {
    items[event.target.name].checked = event.target.checked
    setItems([...items])
    const data = items.filter(item => item.checked).map(item => item.value)
    cronState.MANY = data.toString()
    cronState.value = data.toString()
    setState({ ...cronState })
  }

  const handleChangeBetween = event => {
    const current = cronState.BETWEEN.split('-')
    const value = event.target.value
    const name = event.target.name
    if (name === 'one') {
      current[0] = value
    } else {
      current[1] = value
    }
    cronState.BETWEEN = `${current[0]}-${current[1]}`
    cronState.value = `${current[0]}-${current[1]}`
    setState({ ...cronState })
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