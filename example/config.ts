import {
  UniversalComponentConfig,
} from '../src'


const context = (require as any).context('.', true)
const ucsConfig = new UniversalComponentConfig(context)

ucsConfig.addComponentRunner({
  name: "react-components",
  matcher: "./**/*.react.tsx",
  getTestDataPath: (path) => {
    return path.replace(".react.tsx", ".data.ts")
  },
  getTestCSSPath: (path) => {
    return path.replace(".react.tsx", ".test.css")
  },
  getTestJSPath: (path) => {
    return path.replace(".react.tsx", ".test.ts")
  },
  renderServer: (componentModule, data) => {
    const ReactDOMServer = require('react-dom/server')
    const React = require('react')

    return ReactDOMServer.renderToString(
      React.createElement(componentModule.default, data)
    )
  },
  renderClient: (container, componentModule, data) => {
    const ReactDOM = require('react-dom')
    const React = require('react')

    return ReactDOM.render(
      React.createElement(componentModule.default, data),
      container
    )
  }
})

export default ucsConfig
