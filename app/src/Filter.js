import React, { Component } from "react"
import EnigmaService from "./services/EnigmaService"
import "./Filter.css"

class Filter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filterList: []
    }
  }

  async componentDidMount() {
    EnigmaService.getList(this.props.field, {}, this.updateList.bind(this))
  }

  async updateList(model) {
    const layout = await model.getLayout()
    const filterList = layout.qListObject.qDataPages[0].qMatrix
      .map(listItem => {
        const item = listItem[0]
        const value = item.qText || "<none>"
        const classes = ["filter-item"]
        classes.push(`state-${item.qState.toLowerCase()}`)
        return (
          <div
            key={value}
            className={classes.join(" ")}
          >
            {value}
          </div>
        )
      })
    this.setState({ filterList })
  }

  render() {
    const { filterList } = this.state
    const { title } = this.props
    return (
      <div className="Filter">
        <div className="title">{title}</div>
        <div className="content">{filterList}</div>
      </div>
    )
  }
}

export default Filter
