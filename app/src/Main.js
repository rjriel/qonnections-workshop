import React, { Component } from "react"
import "./App.css"
import Movie from "./Movie"
import EnigmaService from "./services/EnigmaService"

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieList: []
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
            qHeight: 100,
            qLeft: 0,
            qWidth: 9
          }
        ],
        qSuppressZero: false,
        qSuppressMissing: true
      }
    }

    EnigmaService.getData(hypercubeProperties, this.updateData.bind(this))
  }

  async updateData(model) {
    const layout = await model.getLayout()
    const dimensions = layout.qHyperCube.qDimensionInfo
    const movieList = layout.qHyperCube.qDataPages[0].qMatrix.map(
      (listItem, index) => {
        const item = {}
        for (let i = 0; i < dimensions.length; i++) {
          item[dimensions[i].qFallbackTitle] = listItem[i].qText
        }
        return <Movie key={`movie${index}`} movie={item} />
      }
    )
    this.setState({ movieList })
  }

  render() {
    const { movieList } = this.state
    return <div className="Main">{movieList}</div>
  }
}

export default Main
