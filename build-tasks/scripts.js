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
    node: {
      __dirname: false,
    },
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
    node: {
      express: 'empty',
      fs: 'empty',
      net: 'empty',
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

      const start = Math.min(stats.stats.map((s) => s.startTime))
      const end = Math.max(stats.stats.map((s) => s.endTime))

      scriptsMonitor.reportSuccess(
        stats.toString({colors: true}),
        end - start
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
