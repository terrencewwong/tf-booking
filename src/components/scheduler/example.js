import React from 'react'
import { storiesOf } from '@storybook/react'
import Scheduler from '.'

storiesOf('scheduler')
  .add('default', () => {
    const timeslots = [ 'Monday', 'Tuesday' ]
    return <Scheduler timeslots={timeslots} />
  })
