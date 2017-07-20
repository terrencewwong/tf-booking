// @flow
type RenderArguments = {
  template: ({ html: string, css: string }) => string
}

import React, { Component } from 'react'
import { render } from 'react-dom'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

// Client
if (typeof document !== 'undefined') {
  render(<h1>Hello</h1>, document.getElementById('outlet'))
}

export default (args: RenderArguments) => {
  const { template } = args
  const sheet = new ServerStyleSheet()
  const html = renderToString(sheet.collectStyles(<h1>Hello</h1>))
  const css = sheet.getStyleTags()
  return template({ html, css })
}
