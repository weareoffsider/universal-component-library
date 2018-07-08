import React, {Component, Fragment} from "react"
import DOM from 'react-dom-factories'
import {
  ComponentContents,
  ComponentContentEntry,
  WebpackContext,
} from '../UniversalComponentConfig'
import ComponentList from './ComponentList'

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
    const link = activeKey[0] == '.' ? activeKey.slice(1) : activeKey

    return <Fragment>
      <ComponentList contents={contents} activeKey={activeKey} />
      <div className="ComponentServerRenderPane" data-component-key={activeKey}>
        {dataKeys.map((dataKey) => {
          const componentModule = context(componentEntry.key)
          const stringRender = componentEntry.config.renderServer(
            componentModule, componentEntry.data[dataKey], componentEntry.key
          )

          return <div className="RenderComponent">
            <h1 className="RenderComponent__header">
              <a href={link + "/" + dataKey}>{dataKey}</a>
            </h1>
            <div
              data-props-key={dataKey}
              className="RenderComponent__wrapper"
              dangerouslySetInnerHTML={{__html: stringRender}}
            />
          </div>
        })}
      </div>
    </Fragment>
  }
}
