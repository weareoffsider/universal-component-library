import React, {Component} from "react"
import Button from "../../atoms/Button"
import Header from "../../atoms/Header"

interface ListPageProps {
  title: string
}

export default class ListPage extends Component<ListPageProps, {}> {
  static displayName = "ListPage"
  render () {
    const {title} = this.props
    return <div>
      <Header title={title} />
      <Button title="Some Button" />
    </div>
  }
}
