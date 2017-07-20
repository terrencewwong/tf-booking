import React, { Component } from 'react'
let makeWidget
makeWidget = typeof document !== 'undefined'
  ? require('@typeform/embed').makeWidget
  : null

import { Route } from 'react-router-dom'
import Scheduler from './scheduler'
import paths from '../paths'
import { getPoll } from '../transport'

export default class Typeform extends Component {
  state = { isTFVisible: true }

  handleEmbedMessage = (e) => {
    const { onFormSubmit } = this.props
    if (e.data === 'form-submit') {
      this.handleFormSubmit()
    }
  }

  handleFormSubmit = () => {
    this.setState({ isTFVisible: false })
  }

  componentDidMount () {
    const { id } = this.props
    getPoll(id)
      .then(data => {
        const tfUrl = this.props.tfUrl || data.tfUrl
        makeWidget && makeWidget(this.container, tfUrl)
        this.container.querySelector('iframe').focus()
        window.addEventListener('message', this.handleEmbedMessage)

        this.setState({ ...data, redirect: false })
      })
  }

  render () {
    const { id } = this.props
    const { isTFVisible, tfUrl, ...rest } = this.state
    return <div>
      { isTFVisible && <div style={{height: '100vh'}} ref={container => {this.container = container}} /> }
      { !isTFVisible && <Scheduler id={id} {...rest} />}
    </div>
  }
}
