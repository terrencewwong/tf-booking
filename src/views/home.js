// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router'
import { DateUtils } from 'react-day-picker'
import TimeslotPicker from '../components/timeslot-picker'
import paths from '../paths'

type State = {
  tfUrl: string,
  selectedDays: Date[],
  timeslots: Timeslot[],
  redirect: boolean
}

type Timeslot = {
  start: string,
  end: string
}

type Modifiers = {
  selected: boolean
}

const FlexWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export default class Home extends Component {
  tfUrlInput: HTMLInputElement
  state: State = {
    tfUrl: '',
    selectedDays: [],
    timeslots: [],
    redirect: false
  }

  handleDayClick = (day: Date, modifiers: Modifiers) => {
    const { selected } = modifiers
    const { selectedDays } = this.state

    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      )
      selectedDays.splice(selectedIndex, 1)
    } else {
      selectedDays.push(day)
    }
    this.setState({ selectedDays })
  }

  handleTfUrlChange = () => {
    this.setState({ tfUrl: this.tfUrlInput.value })
  }

  handleSubmit = () => {
    this.setState({ redirect: true })
  }

  render () {
    const { selectedDays, timeslots, tfUrl, redirect } = this.state

    if (redirect) {
      return <Redirect push to={{
        pathname: paths.poll,
        state: { yolo: true }
      }} />
    }



    return <FlexWrapper>
      <input
        type="text"
        value={tfUrl}
        ref={input => this.tfUrlInput = input}
        placeholder={'Typeform url...'}
        onChange={this.handleTfUrlChange}
      />
      <TimeslotPicker
        selectedDays={selectedDays}
        timeslots={timeslots}
        onDayClick={this.handleDayClick}
      />
      <button onClick={this.handleSubmit}>Done</button>
    </FlexWrapper>
  }
}
