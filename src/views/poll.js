import React from 'react'
import Scheduler from '../components/scheduler'

export default ({ history, location, match }) => {
  const state = location.state || {}

  return <Scheduler {...state} />
}
