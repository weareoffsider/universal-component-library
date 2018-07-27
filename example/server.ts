import {
  UniversalComponentServer,
} from '../src'

import * as express from 'express'

import ucsConfig from './config'

const ucsServer = new UniversalComponentServer(
  ucsConfig,
  {
    scripts: ['/ExampleClient.pkg.js'],
    head: `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    footer: `<footer></footer>`,
  }
)

if (process.argv.indexOf('static') != -1) {
  ucsServer.renderStatic(__dirname)
} else {
  ucsServer.configApp((app) => {
    app.use('/', express.static(__dirname))
  })
  ucsServer.runServer()
}
