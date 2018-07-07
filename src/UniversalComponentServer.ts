import express from 'express'
import path from 'path'
import {Glob} from 'glob'


interface UCSConfigEntry {
  name: string
  matcher: string
  getTestDataPath: (pth: string) => string
  getTestCSSPath: (pth: string) => string
  getTestJSPath: (pth: string) => string
  renderItem: (component: any, data: any, pth: string) => string
}

export class UniversalComponentConfig {
  public configs: UCSConfigEntry[]

  constructor (
    public importer: (path: string) => any
  ) {
    this.configs = []
  }

  addComponentRunner(config: UCSConfigEntry) {
    this.configs.push(config)
  }
}

export class UniversalComponentServer {
  private app: any

  constructor(
    public config: UniversalComponentConfig
  ) {
    const express = require('express')
    this.app = express()

    console.log(config.importer)
  }

  runServer() {
    this.app.get('/', (req: any, res: any) => res.send('Hello World!'))
    this.app.listen(3000, () => console.log('Example app listening on port 3000!'))
  }

}
