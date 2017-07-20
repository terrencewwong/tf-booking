import React from 'react'
import EmbeddedTypeform from '../components/embedded-typeform'

export default ({ history, location, match }) => {
  const state = location.state || {}
  const { id } = match.params
  return <EmbeddedTypeform id={id} {...state} />
}
