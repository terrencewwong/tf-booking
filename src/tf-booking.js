import React from 'react'
import {
  Route
} from 'react-router'
import EmbeddedTypeform from './components/embedded-typeform'
import paths from './paths'

const Scheduler = () => <h1>hello</h1>

export default () => (
  <div>
    <Route exact path={paths.root} component={EmbeddedTypeform}/>
    <Route exact path={paths.scheduler} component={Scheduler} />
  </div>
)
