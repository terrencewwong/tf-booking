import React, { Component } from 'react'
import { makeWidget } from '@typeform/embed'
import { Route } from 'react-router-dom'
import paths from '../paths'

class Typeform extends Component {
  state = { isTFVisible: true }

  handleEmbedMessage = (e) => {
    const { onFormSubmit } = this.props
    if (e.data === 'form-submit') {
      onFormSubmit()
    }
  }

  componentDidMount () {
    makeWidget(this.container, 'https://terrencewong1.typeform.com/to/hKy3XP')
    this.container.querySelector('iframe').focus()
    window.addEventListener('message', this.handleEmbedMessage)
  }

  render () {
    return <div style={{height: '100vh'}} ref={container => {this.container = container}} />
  }
}

export default () => (
  <Route render={({ history }) => (
    <Typeform onFormSubmit={() => history.push(paths.scheduler)} />
  )} />
)
