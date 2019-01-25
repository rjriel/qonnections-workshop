import React, { Component } from "react"
import "./App.css"
import Filter from "./Filter"
import EnigmaService from "./services/EnigmaService"

class Filters extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerms: ""
    }
  }

  async searchChange(event) {
    await this.setState({ searchTerms: event.target.value })
  }

  async search(event) {
    await EnigmaService.search(this.state.searchTerms.split(" "), [
      "movie_title"
    ])
  }

  async clear() {
    await EnigmaService.clearSelections()
    await this.setState({ searchTerms: "" })
  }

  render() {
    return (
      <div className="Filters">
        <input
          placeholder="Title Search..."
          type="text"
          value={this.state.searchTerms}
          onChange={this.searchChange.bind(this)}
        />
        <button onClick={this.search.bind(this)}>Search</button>

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
