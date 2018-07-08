var {Anathema} = require('anathema')
let anathema = new Anathema()

anathema.config = {
  paths: {
    exampleSrc: 'example',
    serverSrc: 'server',
    staticOut: 'build/static',
    buildRoot: 'build',
    componentServerOut: 'build/component-server',
    serverDist: 'build/dist/server',
  }
}

module.exports = anathema
