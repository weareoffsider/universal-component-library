import React, {Component} from "react"
import DOM from 'react-dom-factories'
import {ComponentContents, ComponentContentEntry} from '../UniversalComponentConfig'
import {groupBy} from 'lodash'

interface ComponentListProps {
  contents: ComponentContents
  activeKey?: string
}


export default class ComponentList extends Component<ComponentListProps, {}> {
  static displayName = "ComponentList"

  render () {
    const {contents, activeKey} = this.props

    const contentsGrouped = groupBy(
      Object.keys(contents).map((k) => contents[k]),
      (c: ComponentContentEntry) => c.commonRoot
    )

    const headers = Object.keys(contentsGrouped)

    const groupRenders = headers.map((commonRoot: string) => { 
      const entries = contentsGrouped[commonRoot]
      return <section className="ComponentServerNav__section">
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

    return <div className="ComponentServerNav">
      <main className="ComponentServerNav__bd">
        {groupRenders}
      </main>
    </div>
  }
}
