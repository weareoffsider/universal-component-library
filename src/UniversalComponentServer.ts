import {Minimatch} from 'minimatch'
import React, {Component} from "react"
import ReactDOMServer from 'react-dom/server'
import UniversalComponentConfig from './UniversalComponentConfig'
import HTMLWrapper from './ui/HTMLWrapper'
import ComponentList from './ui/ComponentList'
import ComponentView from './ui/ComponentView'
import {find} from 'lodash'
import path from 'path'
import fs from 'fs'
import mkdirp from 'mkdirp'


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

      const elementHtml = ReactDOMServer.renderToStaticMarkup(element)
      res.send(HTMLWrapper(wrapperProps, elementHtml))
    })
    this.app.get(COMPONENT_PATH, (req: any, res: any) => {
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

        const elementHtml = ReactDOMServer.renderToStaticMarkup(element)
        res.send(HTMLWrapper(wrapperProps, elementHtml))
      }
    })

    this.app.listen(port, () => console.log(`Component Server listening on port ${port}`))
  }


  renderStatic(root: string) {
    const keys = Object.keys(this.config.contents)
    const wrapperProps = {
      scripts: this.options.scripts,
      stylesheets: this.options.stylesheets,
      head: this.options.head,
      footer: this.options.footer,
      title: "Component Library",
    }

    function writeFile(outPath: string, html: string, resolve: any, reject: any) {
      mkdirp(path.dirname(outPath), (err) => {
        if (err) { return reject(err) }

        fs.writeFile(outPath, html, (err) => {
          if (err) { return reject(err) }
          resolve(outPath)
        })
      })
    }

    return Promise.all([
      new Promise((resolve, reject) => {
        const element = React.createElement(
          ComponentList,
          { contents: this.config.contents }
        )

        const outPath = path.join(root, 'index.html')
        const elementHtml = ReactDOMServer.renderToStaticMarkup(element)
        const indexHTML = HTMLWrapper(wrapperProps, elementHtml)
        writeFile(outPath, indexHTML, resolve, reject)
      }),
    ].concat(
      keys.map((key) => {
        const compEntry = this.config.contents[key]
        const activeKey = key
        const variations = ['', '__allTest__'].concat(Object.keys(compEntry.data))

        return Promise.all(variations.map((variation: string) => {
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

          const outPath = path.join(root, activeKey, variation, 'index.html')
          const elementHtml = ReactDOMServer.renderToStaticMarkup(element)
          const html = HTMLWrapper(wrapperProps, elementHtml)

          return new Promise((resolve, reject) => {
            writeFile(outPath, html, resolve, reject)
          })
        }))
      })
    ))
  }

}
