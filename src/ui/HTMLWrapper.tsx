import React, {Component, Fragment} from "react"
import DOM from 'react-dom-factories'
import allStyle from '../CSSExport'

interface HTMLWrapperProps {
  scripts: string[]
  stylesheets: string[]
  head: string
  footer: string
  title: string
  children: any
}



export default function HTMLWrapper(props: HTMLWrapperProps) {
  const {head = "", footer = "", stylesheets = [], scripts = []} = props

  return <html style={{margin: 0, padding: 0}}>
    <head>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
      {stylesheets.map((url) => {
        return <link key={url} rel="stylesheet" href={url} />
      })}
      <style dangerouslySetInnerHTML={{__html: allStyle}} />
    </head>
    <body style={{margin: 0, padding: 0}}>
      <div dangerouslySetInnerHTML={{__html: head}} />
      {props.children}
      {scripts.map((url) => {
        return <script key={url} type="text/javascript" src={url}></script>
      })}
      <div dangerouslySetInnerHTML={{__html: footer}} />
    </body>
  </html>
}
