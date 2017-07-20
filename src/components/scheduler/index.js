// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import type { Children } from 'react'
import Text from '../text'
import { getPoll, updatePoll } from '../../transport'

const FIRST_COLUMN_WIDTH = '11rem'

const Row = styled.div`
  display: flex;
`

const TimeslotsRow = styled(Row)`
  margin-left: ${FIRST_COLUMN_WIDTH};
`

const CellWrapper = styled.div`
  box-sizing: border-box;
  padding: 0.5rem;
  width: 5.5rem;
  text-align: center;
`

type cellProps = {
  children?: Children,
  className?: string
}

const Cell = (props: cellProps) => (
  <CellWrapper className={props.className}>
    <Text size='size1'>{props.children}</Text>
  </CellWrapper>
)

const FirstColumnCell = styled(Cell)`
  width: ${FIRST_COLUMN_WIDTH};
`

const Timeslot = ({ children }) => {
  return <Cell>
    {children}
  </Cell>
}

const Button = styled.button`

`

type Participant = {
  name: string,
  availableTimeslots: string[]
}

type Props = {
  id: string,
  timeslots: string[],
  participants: Participant[],
  onSubmit: Function
}

type TimeslotResponse = {
  timeslot: string,
  rsvp: boolean
}

type State = {
  timeslots: string[],
  participants: Participant[],
  name: string,
  timeslotResponses: TimeslotResponse[]
}

export default class Scheduler extends Component {
  props: Props
  static defaultProps: Props
  state: State
  currentRSVPCounts: {
    [string]: number
  }

  static defaultProps = {
    timeslots: [],
    participants: [],
    onSubmit: () => {}
  }

  constructor (props: Props) {
    super(props)

    const { timeslots, participants } = props
    const timeslotResponses = timeslots.map(timeslot => {
      return {
        timeslot,
        rsvp: false
      }
    })

    this.state = {
      timeslots,
      participants,
      name: '',
      timeslotResponses
    }

  }

  componentDidMount () {
    const { id } = this.props

    getPoll(id)
      .then(data => {
        console.log(data)
        this.setState({ ...data, redirect: false })
      })
  }

  convertColRowToName = (col: number, row: number) => `${col}:${row}`

  convertNameToColRow = (name: string) => {
    const [ col, row ] = name.split(':')

    return { col: Number(col), row: Number(row) }
  }

  handleRsvpChange = (e: Event) => {
    const { name, checked } = (e.target: window.HTMLInputElement)
    const { timeslotResponses } = this.state
    const index = timeslotResponses.findIndex(({ timeslot }) => timeslot === name)
    timeslotResponses[index] = {
      timeslot: name,
      rsvp: checked
    }

    this.setState({ timeslotResponses })
  }
  handleInputChange = () => {
    this.setState({ name: this.input.value })
  }

  handleSubmit = () => {
    const { id } = this.props
    const { timeslots, name, participants, timeslotResponses } = this.state
    const availableTimeslots = timeslotResponses
      .filter(timeslotResponse => timeslotResponse.rsvp)
      .map(({ timeslot }) => timeslot)

    participants.push({
      name,
      availableTimeslots
    })

    const payload = {
      participants
    }

    updatePoll({
      id,
      payload
    })

    this.setState({
      name: '',
      timeslotResponses: timeslots.map(timeslot => {
        return {
          timeslot,
          rsvp: false
        }
      }),
      participants
    })
  }

  render () {
    const { onSubmit } = this.props
    const { timeslots, participants } = this.state
    const { name, timeslotResponses } = this.state

    const currentRSVPCounts = participants.reduce((counts, { availableTimeslots }) => {
      availableTimeslots.forEach(timeslot => {
        counts[timeslot] = counts[timeslot]
          ? counts[timeslot] + 1
          : 1
      })

      return counts
    }, {})


    const participantRows = participants.map(({ name, availableTimeslots }) => {
      const rsvpCells = timeslots.map(timeslot => {
        return <Cell key={timeslot}>
          { availableTimeslots.includes(timeslot) ? '🙋': '' }
        </Cell>
      })
      return <Row>
        <FirstColumnCell>{name}</FirstColumnCell>
        {rsvpCells}
      </Row>
    })

    const timeslotRSVPCounts = timeslotResponses.map(({ timeslot, rsvp }) => {
      const currentCount = currentRSVPCounts[timeslot] || 0
      return <Cell key={timeslot}>
        {currentCount + Number(rsvp)}
      </Cell>
    })

    const timeslotResponseCheckboxes = timeslotResponses.map(({ timeslot, rsvp }) => {
      return <Cell key={timeslot}>
        <input type='checkbox' name={timeslot} checked={rsvp} onChange={this.handleRsvpChange} />
      </Cell>
    })

    return <div>
      <TimeslotsRow>
        {timeslots.map(timeslot => <Timeslot>{timeslot}</Timeslot>)}
      </TimeslotsRow>
      <Row>
        <FirstColumnCell>
          { participants.length
            ? `${participants.length} participant(s)`
            : 'Be the first to participate'
          }
        </FirstColumnCell>
        {timeslotRSVPCounts}
      </Row>
      { participantRows }
      <Row>
        <FirstColumnCell>
          <input value={name} type="text" ref={input => this.input = input} onChange={this.handleInputChange} />
        </FirstColumnCell>
        { timeslotResponseCheckboxes }
      </Row>
      <Button type='submit' onClick={this.handleSubmit}>Done</Button>
    </div>
  }  
}
