import React from 'react'
import {
  Route,
  Switch
} from 'react-router'
import EmbeddedTypeform from './components/embedded-typeform'
import Home from './views/home'
import Poll from './views/poll'
import paths from './paths'

export default () => (
  <Switch>
    <Route exact path={paths.root} component={Home}/>
    <Route exact path={paths.poll} component={Poll} />
  </Switch>
)
