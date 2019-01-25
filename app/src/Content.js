import React, { Component } from "react"
import "./App.css"
import Filters from "./Filters"
import Main from "./Main"

class Content extends Component {
  render() {
    return (
      <div className="Content">
        <Filters />
        <Main />
      </div>
    )
  }
}

export default Content
