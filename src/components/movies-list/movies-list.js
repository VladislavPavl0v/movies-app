import React from "react";
import MoviesItem from "../movies-item";

import "./movies-list.css";
class MoviesList extends React.Component {
  render() {
    const { moviesData } = this.props;
    return (
      <ul className="movies-list">
        {moviesData.map((item, index) => (
          <MoviesItem
            key={index}
            title={item.title}
            releaseData={item.release_date}
            overview={item.overview}
            poster={item.poster_path}
          />
        ))}
      </ul>
    );
  }
}
export default MoviesList;
