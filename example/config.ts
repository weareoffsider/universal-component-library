import {
  UniversalComponentConfig,
} from '../src'


const context = (require as any).context('.', true)
const ucsConfig = new UniversalComponentConfig(context)

ucsConfig.addComponentRunner({
  name: "react-components",
  matcher: "./**/*.react.tsx",
  getTestData: (path) => {
    const keys = context.keys()
    const testPaths = [
      path.replace(".react.tsx", ".data.tsx"),
      path.replace(".react.tsx", ".data.ts"),
    ]

    for (let i = 0; i < testPaths.length; i++) {
      let dataPath = testPaths[i]
      if (keys.indexOf(dataPath) != -1) {
        return context(dataPath)
      }
    }
    return {default: {}}
  },
  renderServer: (componentModule, data) => {
    const ReactDOMServer = require('react-dom/server')
    const React = require('react')

    return ReactDOMServer.renderToString(
      React.createElement(componentModule.default, data)
    )
  },
  renderClient: (container, componentModule, data, path) => {
    const ReactDOM = require('react-dom')
    const React = require('react')

    return ReactDOM.hydrate(
      React.createElement(componentModule.default, data),
      container
    )
  }
})


export default ucsConfig
