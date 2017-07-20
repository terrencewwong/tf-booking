import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import InteractiveTimeslotList from '.'

storiesOf('interactive-timeslot-list')
  .add('default', () => {
    return <InteractiveTimeslotList onChange={action('onChange')} onTimeChange={action('onTimeChange')} />
  })
