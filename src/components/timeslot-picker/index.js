// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import InteractiveTimeslotList from '../interactive-timeslot-list'

type Modifiers = {
  selected: boolean
}

type Timeslot = {
  start: string,
  end: string
}

type State = {
  selectedDays: Date[],
  timeslots: Timeslot[]
}

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const FloatRight = styled.div`
  float: right;
`

const MarginBottom = styled.div`
  margin-bottom: 1rem;
`

const MarginRight = styled.div`
  margin-right: 1rem;
`

const Button = styled.button`
  border: none;
  padding: 0.5rem;
  outline: none;
  cursor: pointer;
  border-radius: 3px;
  background-color: hsl(11, 100%, 70%);
  color: #fff;

  font-size: 0.62rem;
  line-height: 1;

  :hover {
    background-color: hsl(11, 100%, 75%);
    transition: background-color 0.4s ease;
  }
`

const DangerButton = styled(Button)`
  padding: 0.25rem 0.4rem;
  background-color: hsl(350, 100%, 40%);

  :hover {
    background-color: hsl(350, 100%, 42%);
  }

`

type DeleteableTimeslotProps = {
  timeslot: Timeslot,
  onDelete?: Function
}

const DeletableTimeslot = (props: DeleteableTimeslotProps) => {
  const { timeslot, onDelete } = props
  return <MarginBottom>
    <FlexWrapper>
      <MarginRight>
        <InteractiveTimeslotList />
      </MarginRight>
      <DangerButton onClick={onDelete}>-</DangerButton>
    </FlexWrapper>
  </MarginBottom>
}

export default class TimeslotPicker extends Component {
  state: State = {
    selectedDays: [],
    timeslots: []
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

  addTimeslot = () => {
    const { timeslots } = this.state
    timeslots.push({ start: '', end: '' })
    this.setState({ timeslots })
  }

  deleteTimeslotAtIndex = (index: number) => {
    const { timeslots } = this.state
    timeslots.splice(index, 1)
    this.setState({ timeslots })
  }

  render () {
    const { timeslots } = this.state

    return <FlexWrapper>
      <DayPicker
        selectedDays={this.state.selectedDays}
        onDayClick={this.handleDayClick}
      />
      <div>
        {timeslots.map((timeslot, index) => (
          <DeletableTimeslot
            timeslot={timeslot}
            onDelete={() => this.deleteTimeslotAtIndex(index)}
          />
        ))}
        <FloatRight>
          <Button onClick={this.addTimeslot}>Add Timeslot</Button>
        </FloatRight>
      </div>
    </FlexWrapper>
  }
}
