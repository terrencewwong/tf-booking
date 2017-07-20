import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TimeInput from '.'

storiesOf('time-input')
  .add('default', () => {
    return <TimeInput onChange={action('onChange')} onTimeChange={action('onTimeChange')} />
  })
