import React from "react";
import ApiMovies from "../../services/ApiMovies";

import MoviesList from "../movies-list";

import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesData: [],
      loading: true,
      online: navigator.onLine,
    };
  }

  componentDidMount() {
    // Создаем экземпляр ApiMovies
    this.apiMovies = new ApiMovies();
    
    // Добавляем слушателей события online и offline
    window.addEventListener("online", this.handleOnlineStatus);
    window.addEventListener("offline", this.handleOnlineStatus);

    // Вызываем методы для загрузки данных
    this.fetchMovies();
    // this.fetchGenres();
    // this.fetchTopRatedMovies();
  }

  componentWillUnmount() {
    // Удаляем слушателей при размонтировании компонента
    window.removeEventListener("online", this.handleOnlineStatus);
    window.removeEventListener("offline", this.handleOnlineStatus);
  }

  handleOnlineStatus = () => {
    this.setState({ online: navigator.onLine });
  };

  fetchMovies() {
    // Используйте экземпляр для вызова метода
    this.apiMovies.getAllMovies().then((data) => {
      if (data.results) {
        this.setState({
          moviesData: data.results,
          loading: false,
        });
      }
    });
  }

  render() {
    const { moviesData, loading, online } = this.state;
    
    if (!online) {
      return <div>Дай интернет</div>;
    }

    return (
      <section className="app">
        <MoviesList moviesData={moviesData} loading={loading} />
      </section>
    );
  }
}

export default App;
