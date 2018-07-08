import React, {Component} from "react"
import DOM from 'react-dom-factories'
import {
  ComponentContents,
  ComponentContentEntry,
  WebpackContext,
} from '../UniversalComponentConfig'

interface ComponentViewProps {
  contents: ComponentContents
  componentEntry: ComponentContentEntry
  context: WebpackContext
}


export default class ComponentView extends Component<ComponentViewProps, {}> {
  static displayName = "ComponentView"

  render () {
    const {
      contents,
      componentEntry,
      context,
    } = this.props

    const keys = Object.keys(contents)

    const dataKeys = Object.keys(componentEntry.data)

    return <div className="ComponentView">
      {dataKeys.map((dataKey) => {
        const componentModule = context(componentEntry.key)
        const stringRender = componentEntry.config.renderServer(
          componentModule, componentEntry.data[dataKey], componentEntry.key
        )

        return <div
          data-key={dataKey}
          className="ComponentView__component"
          dangerouslySetInnerHTML={{__html: stringRender}}
        />
      })}
    </div>
  }
}
