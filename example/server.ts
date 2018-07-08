import {
  UniversalComponentServer,
} from '../src'

import * as express from 'express'

import ucsConfig from './config'

const ucsServer = new UniversalComponentServer(
  ucsConfig,
  ['/assets/ExampleClient.pkg.js']
)
ucsServer.configApp((app) => {
  app.use('/assets', express.static(__dirname))
})

ucsServer.runServer()
