// @flow
type RenderArguments = {
  template: ({ html: string, css: string }) => string
}

import React, { Component } from 'react'
import { StaticRouter } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { render } from 'react-dom'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import TFBooking from './tf-booking'

// Client
if (typeof document !== 'undefined') {
  render(
    (
      <BrowserRouter>
        <TFBooking />
      </BrowserRouter>
    ),
    document.getElementById('outlet')
  )
}

export default (args: RenderArguments) => {
  const { template } = args
  const context = {}
  const sheet = new ServerStyleSheet()
  const html = renderToString(sheet.collectStyles(
    <StaticRouter location={'/'} context={context}>
      <TFBooking />
    </StaticRouter>
  ))
  const css = sheet.getStyleTags()
  return template({ html, css })
}
