import React, {Component} from "react"
import DOM from 'react-dom-factories'
import {ComponentContents, ComponentContentEntry} from '../UniversalComponentConfig'
import {groupBy} from 'lodash'
import {squiggleIcon, browserCollapseIcon} from './svg'

interface ComponentListProps {
  contents: ComponentContents
  showTestLink?: boolean
  activeKey?: string
}


export default class ComponentList extends Component<ComponentListProps, {}> {
  static displayName = "ComponentList"

  render () {
    const {contents, showTestLink, activeKey} = this.props

    const contentsGrouped = groupBy(
      Object.keys(contents).map((k) => contents[k]),
      (c: ComponentContentEntry) => c.commonRoot
    )

    const headers = Object.keys(contentsGrouped)

    const groupRenders = headers.map((commonRoot: string) => { 
      const entries = contentsGrouped[commonRoot]
      return <section key={commonRoot} className="ComponentServerNav__section">
        <h4 className="ComponentServerNav__sectionHeader">{commonRoot}</h4>
        <ul className="ComponentServerNav__sectionLinks">
          {entries.map((c) => {
            const link = c.key[0] == '.' ? c.key.slice(1) : c.key
            if (c.key == activeKey) {
              return <li className="ComponentServerNav__sectionLi" key={c.key}>
                <a className="ComponentServerNav__sectionLink is-active" href={link}>
                  {c.name}
                </a>
              </li>
            } else {
              return <li className="ComponentServerNav__sectionLi" key={c.key}>
                <a className="ComponentServerNav__sectionLink" href={link}>
                  {c.name}
                </a>
              </li>
            }
          })}
        </ul>
      </section>
    })

    const link = activeKey
      ? activeKey[0] == '.' ? activeKey.slice(1) : activeKey
      : ""

    return <div className="ComponentServerNav">
      <header className="ComponentServerNav__header">
        <span>{squiggleIcon("ComponentServerNav__headerIcon")}</span>
        <span className="ComponentServerNav__headerTitle">Component Library</span>
        {showTestLink && <a
          className="ComponentServerNav__testModeLink"
          href={link + "/__allTest__"}
        >
          {browserCollapseIcon()}
        </a>}
      </header>
      <main className="ComponentServerNav__bd">
        {groupRenders}
      </main>
    </div>
  }
}
