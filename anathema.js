const anathema = require("./build-tasks/config.js")
// const mkdirp = require('mkdirp')

// require('./build-tasks/styles.js')
require('./build-tasks/scripts.js')

var del = require('del')

const {staticOut} = anathema.config.paths

anathema.task('clean', function(task) {
  return del([anathema.rootDirectory + '/' + staticOut + '/**/*'])
    .then((paths) => {
      task.stats.filesMatched = task.stats.filesMatched.concat(paths)
      return true
    })
})

anathema.task('clean:dist', function(task) {
  const {serverDist} = anathema.config.paths
  return del([anathema.rootDirectory + '/' + serverDist + '/**/*'])
    .then((paths) => {
      task.stats.filesMatched = task.stats.filesMatched.concat(paths)
      return true
    })
})

let livereloadServer

anathema.dashboard("default", function (dashboard) {
  dashboard.task(['clean'])
  dashboard.task(['scripts'])
  // dashboard.watch(['styles', 'containers'])
  dashboard.monitor(['webpack'])
})


module.exports = anathema
