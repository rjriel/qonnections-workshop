import React, { Component } from "react"
import "./App.css"
import EnigmaService from "./services/EnigmaService"
import Header from "./Header"
import Content from "./Content"

class App extends Component {
  constructor() {
    super()
    this.state = {
      enigmaInitialized: false
    }
  }

  async componentDidMount() {
    let enigmaInitialized = await EnigmaService.init()
    this.setState({ enigmaInitialized })
  }

  render() {
    const { enigmaInitialized } = this.state
    return enigmaInitialized ? (
      <div className="App">
        <Header />
        <Content />
      </div>
    ) : null
  }
}

export default App
