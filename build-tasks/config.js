var {Anathema} = require('anathema')
let anathema = new Anathema()

anathema.config = {
  paths: {
    exampleSrc: 'example',
    serverSrc: 'server',
    staticOut: 'build/static',
    buildRoot: 'build',
    serverDist: 'build/dist/server',
  }
}

module.exports = anathema
