import React, { Component } from 'react'
import styled, { css } from 'styled-components'

const FONT_SIZES = {
  size0: css`
    font-size: 1rem;
    line-height: 1;
  `,
  size0: css`
    font-size: 1rem;
    line-height: 1;
  `,
  size0: css`
    font-size: 1rem;
    line-height: 1;
  `,
  size0: css`
    font-size: 1rem;
    line-height: 1;
  `
}

const FIRST_COLUMN_WIDTH = '11rem'

const Row = styled.div`
  display: flex;
`

const TimeslotsRow = styled(Row)`
  margin-left: ${FIRST_COLUMN_WIDTH};
`

const FirstColumnCell = styled.div`
  width: ${FIRST_COLUMN_WIDTH};
`

const Cell = styled.div`
  box-sizing: border-box;
  width: 5.5rem;
`

const Text = styled.p`
`

const Timeslot = ({ month, day, dayOfWeek, time }) => {
  return <Cell>
    <Text size="size1">{month}</Text>
    <Text size="size2">{day}</Text>
    <Text size="size1">{dayOfWeek}</Text>
    <Text size="size0">{time}</Text>
  </Cell>
}

export default class Scheduler extends Component {
  render () {
    return <div>
      <TimeslotsRow>
        <Cell>Jul 19 Wed 8:00 AM</Cell>
        <Cell>Jul 19 Wed 8:30 AM</Cell>
      </TimeslotsRow>
      <Row>
        <FirstColumnCell>Be the first to participate</FirstColumnCell>
        <Cell>0</Cell>
        <Cell>0</Cell>
      </Row>
      <Row>
        <FirstColumnCell>
          <input type="text" />
        </FirstColumnCell>
        <Cell>Foo</Cell>
        <Cell>Bar</Cell>
      </Row>

    </div>
  }  
}
