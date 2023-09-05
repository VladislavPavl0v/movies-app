import React from "react";
import { format } from "date-fns";

import "./movies-item.css";

class MoviesItem extends React.Component {
  render() {
    const { title, releaseData, overview, poster } = this.props;
    const posterImage = poster
      ? `https://image.tmdb.org/t/p/original${poster}`
      : null;
    const formatData = releaseData
      ? format(new Date(releaseData), "MMMM d,y")
      : "";
    const overviewSlice = (overview) => {
      if (overview.length > 200) {
        return overview.slice(0, 200) + "...";
      }
      return overview;
    };

    return (
      <li className="movies-item">
        <img src={posterImage} alt="Movie Poster" className="poster-image" />
        <div className="movies-description">
          <h5 className="title">{title}</h5>
          <span className="release-data">{formatData}</span>
          <div className="genre">Action</div>
          <span className="overview">{overviewSlice(overview)}</span>
        </div>
      </li>
    );
  }
}

export default MoviesItem;
