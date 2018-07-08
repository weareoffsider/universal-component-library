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
  activeKey: string
  context: WebpackContext
}


export default class ComponentView extends Component<ComponentViewProps, {}> {
  static displayName = "ComponentView"

  render () {
    const {
      contents,
      componentEntry,
      context,
      activeKey
    } = this.props

    const keys = Object.keys(contents)
    const dataKeys = Object.keys(componentEntry.data)

    return <div className="ComponentView" data-component-key={activeKey}>
      {dataKeys.map((dataKey) => {
        const componentModule = context(componentEntry.key)
        const stringRender = componentEntry.config.renderServer(
          componentModule, componentEntry.data[dataKey], componentEntry.key
        )

        return <div className="ComponentView__component">
          <h1 className="ComponentView__title">{dataKey}</h1>
          <div
            data-props-key={dataKey}
            className="ComponentView__componentRender"
            dangerouslySetInnerHTML={{__html: stringRender}}
          />
        </div>
      })}
    </div>
  }
}
