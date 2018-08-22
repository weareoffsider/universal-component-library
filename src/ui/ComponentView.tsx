import React, {Component, Fragment} from "react"
import DOM from 'react-dom-factories'
import {
  ComponentContents,
  ComponentContentEntry,
  WebpackContext,
} from '../UniversalComponentConfig'
import ComponentList from './ComponentList'
import {browserExpandIcon} from './svg'

interface ComponentViewProps {
  contents: ComponentContents
  componentEntry: ComponentContentEntry
  activeKey: string
  context: WebpackContext
  activeDataKey?: string
}


export default class ComponentView extends Component<ComponentViewProps, {}> {
  static displayName = "ComponentView"

  render () {
    const {
      contents,
      componentEntry,
      context,
      activeKey,
      activeDataKey,
    } = this.props

    let testMode = false
    const keys = Object.keys(contents)
    let dataKeys = Object.keys(componentEntry.data)

    if (dataKeys.indexOf(activeDataKey) != -1) {
      testMode = true
      dataKeys = dataKeys.filter((k) => activeDataKey == k)
    } else if (activeDataKey == '__allTest__') {
      testMode = true
    }

    const link = activeKey[0] == '.' ? activeKey.slice(1) : activeKey

    if (testMode) {
      return <Fragment>
        <a className="ComponentServer__RemoveTestMode" href={link}>
          <span>{browserExpandIcon("ComponentServer__RemoveTestModeIcon")}</span>
          <span className="ComponentServer__RemoveTestModeLabel">{"Show Component Browser"}</span>
        </a>
        <div className="RenderAllContainer" data-component-key={activeKey}>
          {dataKeys.map((dataKey) => {
            const componentModule = context(componentEntry.key)
            const stringRender = componentEntry.config.renderServer(
              componentModule, componentEntry.data[dataKey], componentEntry.key
            )

            return <div
              data-props-key={dataKey}
              className="RenderContainer"
              dangerouslySetInnerHTML={{__html: stringRender}}
            />
          })}
        </div>
      </Fragment>
    }

    return <Fragment>
      <ComponentList showTestLink contents={contents} activeKey={activeKey} />
      <div className="RenderAllContainer ComponentServerRenderPane" data-component-key={activeKey}>
        <nav className="RenderContents">
          {dataKeys.map((dataKey) => {
            return <a href={link + "/" + dataKey}>{dataKey}</a>
          })}
        </nav>
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
              className="RenderContainer RenderComponent__wrapper"
              dangerouslySetInnerHTML={{__html: stringRender}}
            />
          </div>
        })}
      </div>
    </Fragment>
  }
}
