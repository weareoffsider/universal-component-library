import React, {Component} from "react"
import DOM from 'react-dom-factories'

interface HeaderProps {
  title: string
}

export default class Header extends Component<HeaderProps, {}> {
  static displayName = "Header"
  render () {
    const {title} = this.props
    return <h1>{title}</h1>
  }
}
