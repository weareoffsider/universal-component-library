import express from 'express'
import {Minimatch} from 'minimatch'
import React, {Component} from "react"
import ReactDOMServer from 'react-dom/server'
import UniversalComponentConfig from './UniversalComponentConfig'
import ComponentList from './Chrome/ComponentList'
import ComponentView from './Chrome/ComponentView'
import {find} from 'lodash'

const COMPONENT_PATH = /(.*)$/
export default class UniversalComponentServer {
  private app: any

  constructor(
    public config: UniversalComponentConfig
  ) {
    config.collectComponents()
    const express = require('express')
    this.app = express()
    console.log(config.contents)
  }

  runServer() {
    this.app.get('', (req: any, res: any) => {
      const element = React.createElement(
        ComponentList,
        { contents: this.config.contents }
      )

      const html = ReactDOMServer.renderToStaticMarkup(element)
      res.send(html)
    })
    this.app.get(COMPONENT_PATH, (req: any, res: any) => {
      const path = req.path
      console.log(path)

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
            context: this.config.context,
          }
        )

        const html = ReactDOMServer.renderToStaticMarkup(element)
        res.send(html)
      }
    })
    this.app.listen(3000, () => console.log('Example app listening on port 3000!'))
  }

}
