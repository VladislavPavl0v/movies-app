import React from "react";
import ApiMovies from "../../services/ApiMovies";

//import { Spin, Tabs } from "antd";
import MoviesList from "../movies-list";

import "./app.css";

class App extends React.Component {
  ApiMovies = new ApiMovies();
  state = {
    moviesData: [],
  };

  componentDidMount() {
    // Вызываем методы для загрузки данных
    this.fetchMovies();
    //this.fetchGenres();
    // this.fetchTopRatedMovies();
  }

  fetchMovies() {
    this.ApiMovies.getAllMovies().then((data) => {
      if (data.results) {
        this.setState({
          moviesData: data.results,
        });
      }
    });
  }

  render() {
    const { moviesData } = this.state;
    return (
      <section className="app">
        <MoviesList moviesData={moviesData} />
      </section>
    );
  }
}
export default App;

/*   <div>
        {movieData.map((movie, index) => (
            // Создаем компонент для каждого фильма в массиве
            <div key={index}>
              {movie.original_title}
              {movie.original_language}
              {movie.release_date}
            </div>
          ))}
        </div>*/
