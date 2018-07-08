import React, {Component} from "react"

interface ButtonProps {
  title: string
}

interface ButtonState {
  count: number
}

export default class Button extends Component<ButtonProps, ButtonState> {
  static displayName = "Button"

  constructor (props: ButtonProps) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.state = {
      count: 0,
    }
  }

  onClick (e: any) {
    e.preventDefault()
    this.setState({count: this.state.count + 1})
  }

  render () {
    const {title} = this.props
    const {count} = this.state
    return <button onClick={this.onClick}>
      {title + ' (' + count + ')'}
    </button>
  }
}
