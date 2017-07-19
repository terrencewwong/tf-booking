import React, { Component } from 'react'
import styled from 'styled-components'

const Row = styled.div`
  display: flex;
`
const Cell = styled.div`
  box-sizing: border-box;
  border: 1px solid blue;
  min-width: 5.5rem;
  background: red;
`

export default class Scheduler extends Component {
  render () {
    return <div>
      <Row>
        <Cell></Cell>
        <Cell>Foo</Cell>
        <Cell>Bar</Cell>
      </Row>
      <Row>
        <Cell>Be the first to participate</Cell>
        <Cell>Foo</Cell>
        <Cell>Bar</Cell>
      </Row>

    </div>
  }  
}
