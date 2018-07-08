var anathema = require('./config')
var webpack = require('webpack')
var path = require('path')


const scriptsMonitor = anathema.monitor("webpack")

anathema.task("scripts", function (task) {
  const {exampleSrc, componentServerOut} = anathema.config.paths
  const WEBPACK_CONFIG = [{
    mode: "development",
    entry: anathema.rootDirectory + "/" + exampleSrc + "/server.ts",
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    },
    target: 'node',
    output: {
      filename: "ExampleServer.node.js",
      path: anathema.rootDirectory + '/' + componentServerOut,
    }
  }, {
    mode: "development",
    entry: anathema.rootDirectory + "/" + exampleSrc + "/client.ts",
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    },
    output: {
      filename: "ExampleClient.pkg.js",
      path: anathema.rootDirectory + '/' + componentServerOut,
    }
  }]

  const compiler = webpack(WEBPACK_CONFIG)

  if (task.runContext.dashboard) {
    compiler.watch({}, (err, stats) => { 
      if (err) {
        return scriptsMonitor.reportFailure(err)
      }

      if (stats.hasErrors()) {
        return scriptsMonitor.reportFailure(
          stats.toString({
            all: false, errors: true, colors: true, chunks: false
          })
        )
      }

      scriptsMonitor.reportSuccess(
        stats.toString({colors: true}),
        stats.endTime - stats.startTime
      )
    })
    task.stats.filesOutput.push("/" + componentServerOut + "/ExampleServer.node.js")
    task.stats.filesOutput.push("/" + componentServerOut + "/ExampleClient.pkg.js")
    return Promise.resolve(true)
  } else {
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => { 
        if (err) {
          return reject(err)
        }

        if (stats.hasErrors()) {
          return reject(stats.toString({
            all: false, errors: true, colors: true, chunks: false
          }))
        }

        stats.compilation.fileDependencies.forEach((name) => {
          task.stats.filesMatched.push(name)
        })
        task.stats.filesOutput.push("/" + componentServerOut + "/ExampleServer.node.js")
        task.stats.filesOutput.push("/" + componentServerOut + "/ExampleClient.pkg.js")
        resolve(stats)
      })
    })
  }
})
