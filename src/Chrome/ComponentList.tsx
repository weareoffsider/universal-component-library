import React, {Component} from "react"
import DOM from 'react-dom-factories'
import {ComponentContents} from '../UniversalComponentConfig'

interface ComponentListProps {
  contents: ComponentContents
}


export default class ComponentList extends Component<ComponentListProps, {}> {
  static displayName = "ComponentList"

  render () {
    const {contents} = this.props

    const keys = Object.keys(contents)
    console.log(keys)

    return <div className="ComponentList">
      <ul>
        {keys.map((key) => {
          return <li key={key}>
            <a href={key}>{key}</a>
          </li>
        })}
      </ul>
    </div>
  }
}
