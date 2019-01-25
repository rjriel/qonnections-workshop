import React, { Component } from "react"
import "./App.css"
import Filter from "./Filter"

class Filters extends Component {

  render() {
    return (
      <div className="Filters">
        <Filter title="Ratings" field="content_rating" />
        <Filter title="Country" field="country" />
        <Filter title="Language" field="language" />
        <Filter title="Color" field="color" />
      </div>
    )
  }
}

export default Filters
