

// import ComponentServer from './../src/main.js'
// var React = require('react')
// var ReactDOM = require('react-dom/server')
// var express = require('express')
// var fs = require('fs')

// const server = ComponentServer({
//   matcher: "**/*.react.js",
//   basedir: __dirname + "/ui",
//   extraHead: [
//   ],
//   scripts: [
//   ],
//   styles: [
//   ],
//   getTestData: (component, path) => {
//     const dataPath = path.replace(".react.js", ".data.js")
//     try {
//       const testData = require(dataPath)
//       return testData
//     } catch (e) {
//       return {default: {}}
//     }
//   },
//   getTestCSSPath: (component, path) => {
//     const dataPath = path.replace(".react.js", ".test.css")
//     return dataPath
//   },
//   getTestJSPath: (component, path) => {
//     const dataPath = path.replace(".react.js", ".test.js")
//     return dataPath
//   },
//   wrapComponent: (component, props) => {
//     return React.createElement(component, props || {});
//   },
// })

// const RENDER_PATH = __dirname + "/../../../build/"
// const ASSET_PATH = __dirname + "/../../../build/assets/"
// server.configApp((app) => {
//   app.use('/assets', express.static(ASSET_PATH))
// })

// console.log("Running Component Server, port 3600")

// server.staticBuild(RENDER_PATH);
// server.listen(3600)
