// @flow
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import type { Children } from 'react'

const FONT_SIZES = {
  size0: css`
    font-size: 14px;
    line-height: 3;
  `,
  size1: css`
    font-size: 16px;
    line-height: 1.5;
  `,
  size2: css`
    font-size: 24px;
    line-height: 1.5;
  `
}

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

const Text = styled.div`
  margin: 0;
  ${({ size }) => FONT_SIZES[size]}
`

const Timeslot = ({ children }) => {
  return <Cell>
    {children}
  </Cell>
}

const Button = styled.button`

`

type Props = {
  timeslots: string[],
  onSubmit: Function
}

type TimeslotResponse = {
  timeslot: string,
  rsvp: boolean
}

type State = {
  timeslotResponses: TimeslotResponse[]
}

export default class Scheduler extends Component {
  props: Props
  state: State

  constructor (props: Props) {
    super(props)

    const { timeslots } = props
    const timeslotResponses = timeslots.map(timeslot => {
      return {
        timeslot,
        rsvp: false
      }
    })

    this.state = {
      timeslotResponses
    }
  }

  handleCheckboxChange = (e: Event) => {
//    let { columns } = this.state
//    const { name, checked } = e.target
//    const { col, row } = this.convertNameToColRow(name)
//    columns[col][row] = checked
//    this.setState({ columns })
  }

  convertColRowToName = (col: number, row: number) => `${col}:${row}`

  convertNameToColRow = (name: string) => {
    const [ col, row ] = name.split(':')

    return { col: Number(col), row: Number(row) }
  }

  getCountForColumn (col: number) {
//    const { columns } = this.state
//    return columns[col].reduce((count, checked) => count + Number(checked), 0)
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

  render () {
    const { timeslots, onSubmit } = this.props
    const { timeslotResponses } = this.state

    const timeslotRSVPCounts = timeslotResponses.map(({ timeslot, rsvp }) => {
      return <Cell key={timeslot}>
        {Number(rsvp)}
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
        <FirstColumnCell>Be the first to participate</FirstColumnCell>
        {timeslotRSVPCounts}
      </Row>
      <Row>
        <FirstColumnCell>
          <input type="text" />
        </FirstColumnCell>
        { timeslotResponseCheckboxes }
      </Row>
      <Button type='submit' onClick={onSubmit}>Done</Button>
    </div>
  }  
}
