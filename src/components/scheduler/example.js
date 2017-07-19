import React from 'react'
import { storiesOf } from '@storybook/react'
import Scheduler from '.'

storiesOf('scheduler')
  .add('default', () => {
    const timeslots = [ 'Monday', 'Tuesday' ]
    const participants = [
      { name: 'Javi', availableTimeslots: ['Monday'] },
      { name: 'Laura', availableTimeslots: ['Tuesday'] },
    ]

    return <Scheduler timeslots={timeslots} participants={participants} />
  })
