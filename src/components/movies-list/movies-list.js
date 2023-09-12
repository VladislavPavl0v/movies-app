import React from "react";
import { Spin } from "antd";
import MoviesItem from "../movies-item";

import "./movies-list.css";
class MoviesList extends React.Component {
  render() {
    const { moviesData, loading } = this.props;
    if (loading) {
      return <Spin />;
    }
    if (moviesData.length === 0) {
      return <div>Not found! Try again.</div>;
    }
    return (
      <ul className="movies-list">
        {moviesData.map((item) => (
          <MoviesItem
            key={item.id}
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
