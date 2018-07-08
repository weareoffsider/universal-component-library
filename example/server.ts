import {
  UniversalComponentServer,
} from '../src'

import ucsConfig from './config'

const ucsServer = new UniversalComponentServer(ucsConfig)

ucsServer.runServer()
