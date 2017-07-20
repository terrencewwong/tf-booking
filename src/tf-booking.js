import React from 'react'
import {
  Route,
  Switch
} from 'react-router'
import EmbeddedTypeform from './components/embedded-typeform'
import Home from './views/home'
import paths from './paths'

const Scheduler = () => <h1>hello</h1>

export default () => (
  <Switch>
    <Route exact path={paths.root} component={Home}/>
    <Route exact path={paths.scheduler} component={Scheduler} />
  </Switch>
)
