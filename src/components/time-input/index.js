// @flow
// copied from https://github.com/dima-bu/react-time-input
// but accepts an onChange handler
import React, { Component } from 'react'

type Props = {
  onTimeChange: Function,
  onChange?: Function
}

type State = {
  value: string
}

export default class TimeInput extends Component {
  props: Props
  state: State
  input: HTMLInputElement
  lastValue: string = ''

  state = {
    value: ''
  }

  isValid = (val: string): boolean => {
    var letterArr = val.split(':').join('').split(''),
      regexp = /^\d{0,2}?\:?\d{0,2}$/,
      valArr = []

    var [hoursStr, minutesStr] = val.split(':')

    if (!regexp.test(val)) {
      return false
    }

    const hours = Number(hoursStr)
    const minutes = Number(minutesStr)

    const isValidHour = (hour) => Number.isInteger(hours) && hours >= 0 && hours < 24
    const isValidMinutes = (minutes) => (Number.isInteger(minutes) && hours >= 0 && hours < 24) || Number.isNaN(minutes)
    if (!isValidHour(hours) || !isValidMinutes(minutes)) {
      return false
    }

    if (minutes< 10 && Number(minutesStr[0]) > 5) {
      return false
    }

    if (valArr.indexOf(':')) {
      valArr = val.split(':')
    } else {
      valArr.push(val)
    }

    // check mm and HH
    if (valArr[0] && valArr[0].length && (parseInt(valArr[0], 10) < 0 || parseInt(valArr[0], 10) > 23)) {
      return false
    }

    if (valArr[1] && valArr[1].length && (parseInt(valArr[1], 10) < 0 || parseInt(valArr[1], 10) > 59)) {
      return false
    }

    return true
  }

  handleChange = () => {
    let { value } = this.input

    const { onChange, onTimeChange } = this.props

    if (value == this.state.value) {
      return
    }

    if (this.isValid(value)) {

      if (value.length === 2 && this.lastValue.length !== 3) {
        value = value + ':'
      }

      if (value.length === 2 && this.lastValue.length === 3) {
        value = value.slice(0, 1)
      }

      if (value.length > 5) {
        return false
      }

      this.lastValue = value

      this.setState({ value })

      onChange && onChange(value)

      if (value.length === 5) {
        onTimeChange && onTimeChange(value)
      }

    }
  }

  render () {
    const {onTimeChange, onChange, ...rest} = this.props
    const { value } = this.state
    return <input
      type='text'
      value={value}
      ref={input => this.input = input }
      onChange={this.handleChange}
      {...rest}
    />
  }
}
