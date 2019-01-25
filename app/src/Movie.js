import React, { Component } from "react"
import "./Movie.css"

class Movie extends Component {
  render() {
    const {
      movie_title,
      title_year,
      content_rating,
      country,
      language,
      director_name,
      actor_1_name,
      actor_2_name,
      actor_3_name
    } = this.props.movie
    const actors = [actor_1_name, actor_2_name, actor_3_name]
      .filter(actor => actor != null && actor !== "")
      .join(", ")
    return (
      <div className="Movie">
        <div className="title">
          {movie_title} - ({title_year})
        </div>
        <div className="info">
          <div className="header">Rating:</div>
          <div className="content"> {content_rating}</div>
        </div>
        <div className="info">
          <div className="header">Country:</div>
          <div className="content"> {country}</div>
        </div>
        <div className="info">
          <div className="header">Language:</div>
          <div className="content"> {language}</div>
        </div>
        <div className="info">
          <div className="header">Director:</div>
          <div className="content"> {director_name}</div>
        </div>
        <div className="info">
          <div className="header">Actors:</div>
          <div className="content"> {actors}</div>
        </div>
      </div>
    )
  }
}

export default Movie
