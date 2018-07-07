import React, {Component} from "react"

interface ButtonProps {
  title: string
}

export default class Button extends Component<ButtonProps, {}> {
  static displayName = "Button"
  render () {
    const {title} = this.props
    return <button>{title}</button>
  }
}
