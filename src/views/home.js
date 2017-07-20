// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router'
import { DateUtils } from 'react-day-picker'
import uuidv4 from 'uuid/v4'
import { createPoll } from '../transport'
import TimeslotPicker from '../components/timeslot-picker'
import paths from '../paths'
import friendlyDate from '../isomorphic/friendly-date'

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
  id: string
  tfUrlInput: HTMLInputElement
  state: State = {
    tfUrl: '',
    selectedDays: [],
    timeslots: [],
    redirect: false
  }

  componentDidMount () {
    this.id = uuidv4()
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
    const { id } = this
    const { selectedDays, tfUrl } = this.state
    const timeslots = selectedDays.map(date => friendlyDate(date))

    const request = createPoll({
      id,
      payload: { tfUrl, timeslots }
    }).then(data => {
      this.setState({ redirect: true })
    })
  }

  render () {
    const { selectedDays, tfUrl, redirect } = this.state

    if (redirect) {
      const { id } = this
      const timeslots = selectedDays.map(date => friendlyDate(date))
      return <Redirect push to={{
        pathname: `${paths.poll}/${id}`,
        state: { tfUrl, id, timeslots }
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
        timeslots={[]}
        onDayClick={this.handleDayClick}
      />
      <button onClick={this.handleSubmit}>Done</button>
    </FlexWrapper>
  }
}
