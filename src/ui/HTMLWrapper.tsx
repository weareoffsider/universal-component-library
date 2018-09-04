import React, {Component, Fragment} from "react"
import DOM from 'react-dom-factories'
import allStyle from '../CSSExport'

interface HTMLWrapperProps {
  scripts: string[]
  stylesheets: string[]
  head: string
  footer: string
  title: string
}



export default function HTMLWrapper(props: HTMLWrapperProps, elementHtml: string) {
  const {head = "", footer = "", stylesheets = [], scripts = []} = props

  return `
    <!doctype html>
    <html style="margin: 0; padding: 0;">
      <head>
        <meta charSet="utf-8" />
        <title>${props.title}</title>
        ${stylesheets.map((url) => {
          return '<link rel="stylesheet" href="' + url + '" />'
        }).join('\n')}
        <style>${allStyle}</style>
        ${head}
      </head>
      <body style="margin: 0; padding: 0;">
        ${elementHtml}
        ${scripts.map((url) => {
          return '<script type="text/javascript" src="' +url+ '"></script>'
        }).join('\n')}
        ${footer}
      </body>
    </html>
  `
}
