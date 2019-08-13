import React, { Component } from "react"
import "./App.css"
import Filter from "./Filter"
import EnigmaService from "./services/EnigmaService"

class Filters extends Component {

  async clear() {
    await EnigmaService.clearSelections()
    await this.setState({ searchTerms: "" })
  }

  render() {
    return (
      <div className="Filters">
        <button className="clear-button" onClick={this.clear.bind(this)}>
          Clear
        </button>
        <Filter title="Ratings" field="content_rating" />
        <Filter title="Country" field="country" />
        <Filter title="Language" field="language" />
        <Filter title="Color" field="color" />
      </div>
    )
  }
}

export default Filters
