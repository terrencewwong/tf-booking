// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import Text from '../text'
import TimeInput from '../time-input'

const PaddedText = styled(Text)`
  display: inline-block;
  margin: 0 1rem;
`

type Props = {
  className?: string,
  onTimeChange?: Function
}

type State = {
  start: string,
  end: string,
}

export default class InteractiveTimeslotList extends Component {
  props: Props
  state: State = {
    start: '',
    end: ''
  }

  handleTimeChange = (type: string) => {
    return (time: string): mixed => {
      const { onTimeChange } = this.props
      onTimeChange && onTimeChange(type, time)
    }
  }
  handleStartTimeChange = this.handleTimeChange('start')
  handleEndTimeChange = this.handleTimeChange('end')

  render () {
    const { className } = this.props
    const { start, end } = this.state

    return <div className={className}>
      <TimeInput
        placeholder='start'
        onTimeChange={this.handleStartTimeChange}
      />
      <PaddedText>-</PaddedText>
      <TimeInput
        placeholder='end'
        onTimeChange={this.handleEndTimeChange}
      />
    </div>
  }
}
