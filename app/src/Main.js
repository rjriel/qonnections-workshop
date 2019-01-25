import React, { Component } from "react"
import "./App.css"
import Movie from "./Movie"
import EnigmaService from "./services/EnigmaService"

class Main extends Component {
  HEIGHT = 100

  constructor(props) {
    super(props)

    this.state = {
      movieList: [],
      hypercube: null,
      top: 0,
      hasMore: false,
      dimensions: []
    }
  }
  async componentDidMount() {
    const hypercubeProperties = {
      qInfo: {
        qType: "table",
        qId: "table_id"
      },
      labels: true,
      qHyperCubeDef: {
        qDimensions: [
          {
            qDef: {
              qFieldDefs: ["movie_title"]
            }
          },
          {
            qDef: {
              qFieldDefs: ["content_rating"]
            }
          },
          {
            qDef: {
              qFieldDefs: ["title_year"]
            }
          },
          {
            qDef: {
              qFieldDefs: ["director_name"]
            }
          },
          {
            qDef: {
              qFieldDefs: ["actor_1_name"]
            }
          },
          {
            qDef: {
              qFieldDefs: ["actor_2_name"]
            }
          },
          {
            qDef: {
              qFieldDefs: ["actor_3_name"]
            }
          },
          {
            qDef: {
              qFieldDefs: ["language"]
            }
          },
          {
            qDef: {
              qFieldDefs: ["country"]
            }
          }
        ],
        qInitialDataFetch: [
          {
            qTop: 0,
            qHeight: this.HEIGHT,
            qLeft: 0,
            qWidth: 9
          }
        ],
        qSuppressZero: false,
        qSuppressMissing: true
      }
    }

    let hypercube = await EnigmaService.getData(
      hypercubeProperties,
      this.updateData.bind(this)
    )
    await this.setState({ hypercube })
  }

  async updateData(model) {
    const layout = await model.getLayout()
    await this.setState({ top: 0, height: layout.qHyperCube.qSize.qcy, hasMore: layout.qHyperCube.qSize.qcy > this.HEIGHT, dimensions: layout.qHyperCube.qDimensionInfo })
    this.transformMatrix(layout.qHyperCube.qDataPages[0].qMatrix)
  }

  transformMatrix(matrix) {
    const movieList = matrix.map(
      (listItem, index) => {
        const item = {}
        for (let i = 0; i < this.state.dimensions.length; i++) {
          item[this.state.dimensions[i].qFallbackTitle] = listItem[i].qText
        }
        return <Movie key={`movie${index}`} movie={item} />
      }
    )
    this.setState({ movieList })
  }

  async prevPage() {
    await this.setState({top: this.state.top - this.HEIGHT, hasMore: this.state.height > this.state.top })
    const pageDef = [
      {
        qTop: this.state.top,
        qLeft: 0,
        qWidth: 9,
        qHeight: this.HEIGHT
      }
    ]
    let pages = await this.state.hypercube.getHyperCubeData('/qHyperCubeDef', pageDef)
    this.transformMatrix(pages[0].qMatrix)
  }

  async nextPage() {
    await this.setState({top: this.state.top + this.HEIGHT, hasMore: this.state.height > this.state.top + (this.HEIGHT * 2) })
    const pageDef = [
      {
        qTop: this.state.top,
        qLeft: 0,
        qWidth: 9,
        qHeight: this.HEIGHT
      }
    ]
    let pages = await this.state.hypercube.getHyperCubeData('/qHyperCubeDef', pageDef)
    this.transformMatrix(pages[0].qMatrix)
  }

  render() {
    const { movieList, hasMore, top } = this.state
    return (
      <div className="Main">
        {movieList}
        {top > 0 || hasMore ? (
          <div className="paginate">
            {top >  0 ? <div className="previous" onClick={this.prevPage.bind(this)}>Previous</div> : null}
            {hasMore ? <div className="next" onClick={this.nextPage.bind(this)}>Next</div> : null}
        </div>
        ) : null }
      </div>
    )
  }
}

export default Main
