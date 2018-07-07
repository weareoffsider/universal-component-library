import React, {Component} from "react"
import DOM from 'react-dom-factories'
import Button from "../../atoms/Button"
import Header from "../../atoms/Header"

interface HomePageProps { 
  title: string
}

export default class HomePage extends Component<HomePageProps, {}> {
  static displayName = "HomePage"
  render () {
    const {title} = this.props
    return <div>
      <Header title={title} />
      <Button title="Some Button" />
    </div>
  }
}
