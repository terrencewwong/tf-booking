import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import EmbeddedTypeform from './components/embedded-typeform'
import paths from './paths'

const Scheduler = () => <h1>hello</h1>

export default () => (
  <Router>
    <div>
      <Route exact path={paths.root} component={EmbeddedTypeform}/>
      <Route exact path={paths.scheduler} component={Scheduler} />
    </div>
  </Router>
)
