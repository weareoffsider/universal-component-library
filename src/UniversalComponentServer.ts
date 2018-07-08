import {Minimatch} from 'minimatch'
import React, {Component} from "react"
import ReactDOMServer from 'react-dom/server'
import UniversalComponentConfig from './UniversalComponentConfig'
import HTMLWrapper from './ui/HTMLWrapper'
import ComponentList from './ui/ComponentList'
import ComponentView from './ui/ComponentView'
import {find} from 'lodash'

interface ServerOptions {
  scripts?: string[]
  stylesheets?: string[]
  head?: string
  footer?: string
}

const COMPONENT_PATH = /(.*)$/
export default class UniversalComponentServer {
  private app: any

  constructor(
    public config: UniversalComponentConfig,
    public options: ServerOptions = {}
  ) {
    config.collectComponents()
    const express = require('express')
    this.app = express()
  }
  
  configApp (cb: (app: any) => void) {
    cb(this.app)
  }

  runServer(port: number = 3000) {
    const wrapperProps = {
      scripts: this.options.scripts,
      stylesheets: this.options.stylesheets,
      head: this.options.head,
      footer: this.options.footer,
      title: "Component Library",
    }

    this.app.get('', (req: any, res: any) => {
      const element = React.createElement(
        ComponentList,
        { contents: this.config.contents }
      )

      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(HTMLWrapper, wrapperProps, element)
      )
      res.send(html)
    })
    this.app.get(COMPONENT_PATH, (req: any, res: any) => {
      const path = req.path

      const keys = Object.keys(this.config.contents)
      const activeKey = find(keys, (k) => req.path.indexOf(k.slice(1)) != -1)
      if (!activeKey) {
        res.send("", 404)
      } else {
        const [leading, trailing] = req.path.split(activeKey.slice(1))
        const variation = trailing.replace('/', '')

        const element = React.createElement(
          ComponentView,
          { 
            contents: this.config.contents,
            componentEntry: this.config.contents[activeKey],
            activeKey,
            activeDataKey: variation,
            context: this.config.context,
          }
        )

        const html = ReactDOMServer.renderToStaticMarkup(
          React.createElement(HTMLWrapper, wrapperProps, element)
        )
        res.send(html)
      }
    })

    this.app.listen(port, () => console.log(`Component Server listening on port ${port}`))
  }

}
