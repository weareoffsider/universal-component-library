var {Anathema} = require('anathema')
let anathema = new Anathema()

anathema.config = {
  paths: {
    src: 'src',
    exampleSrc: 'example',
    staticOut: 'build/static',
    buildRoot: 'build',
    componentServerOut: 'build/component-server',
    serverDist: 'build/dist/server',
  }
}

module.exports = anathema
