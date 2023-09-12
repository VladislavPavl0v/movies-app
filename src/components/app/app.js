import React from "react";
import ApiMovies from "../../services/ApiMovies";
import InputSearch from "../input-search";
import Footer from "../footer";

import MoviesList from "../movies-list";

import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesData: [],
      loading: true,
      online: navigator.onLine,
      searchValue: "",
      page: 1,
    };
  }
  //обновляем стате из инпута
  searchChange = (value) => {
    this.setState({ searchValue: value, page: 1 }, () => {
      this.fetchMovies();
    });
  };

  // Обработчик изменения страницы
  handlePageChange = (pageNumber) => {
    this.setState({ page: pageNumber }, () => {
      this.fetchMovies();
    });
  };

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
    const { searchValue, page } = this.state;

    this.apiMovies.getAllMovies(searchValue, page).then((data) => {
      if (data.results) {
        this.setState({
          moviesData: data.results,
          loading: false,
        });
        console.log(data);
      }
    });
  }
  render() {
    const { moviesData, loading, online, page } = this.state;

    if (!online) {
      return <div>Дай интернет</div>;
    }

    return (
      <section className="app">
        <InputSearch searchChange={this.searchChange} />
        <MoviesList moviesData={moviesData} loading={loading} />
        <Footer
          page={page}
          onPageChange={this.handlePageChange}
          moviesData={moviesData}
        />
      </section>
    );
  }
}

export default App;
