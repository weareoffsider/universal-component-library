import React, {Component} from "react"
import DOM from 'react-dom-factories'
import allStyle from '../CSSExport'

interface HTMLWrapperProps {
  scripts: string[]
  stylesheets: string[]
  title: string
  children: any
}



export default function HTMLWrapper(props: HTMLWrapperProps) {
  return <html style={{margin: 0, padding: 0}}>
    <head>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
      {props.stylesheets.map((url) => {
        return <link key={url} rel="stylesheet" href={url} />
      })}
      <style dangerouslySetInnerHTML={{__html: allStyle}} />
    </head>
    <body style={{margin: 0, padding: 0}}>
      {props.children}
      {props.scripts.map((url) => {
        return <script key={url} type="text/javascript" src={url}></script>
      })}
    </body>
  </html>
}
