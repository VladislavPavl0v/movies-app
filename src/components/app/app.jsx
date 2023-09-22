import React from "react";
import { Alert } from "antd";
import ApiMovies from "../../services/ApiMovies";
import ApiRatingMovies from "../../services/ApiRatingMovies";
import InputSearch from "../input-search";
import Footer from "../footer";
import HeaderBar from "../header-bar";

import MoviesList from "../movies-list";
import { MoviesProvider } from "../movies-services-context";

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
      totalPages: 1,
      sessionId: "",
      value: 0,
      movieId: "",
      ratedMovies: [],
      activeTab: "1",
      genres: [],
      error: null,
    };
  }

  setError = (errorMessage) => {
    this.setState({ error: errorMessage });
  };
  
  searchChange = (value) => {
    this.setState({ searchValue: value, page: 1 }, () => {
      this.fetchMovies();
    });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ page: pageNumber }, () => {
      this.fetchMovies();
    });
  };

  async componentDidMount() {
    const { value, movieId } = this.state;
    this.apiMovies = new ApiMovies();
    this.apiRatingMovies = new ApiRatingMovies();
    window.addEventListener("online", this.handleOnlineStatus);
    window.addEventListener("offline", this.handleOnlineStatus);

    try {
      const sessionData = await this.apiRatingMovies.guestSession();
      const sessionId = sessionData.guest_session_id;
      this.setState({ sessionId }, () => {
        this.apiRatingMovies
          .addRateMovies(movieId, sessionId, value)
         
          .catch((error) => {
            this.setError(`Произошла ошибка: ${error.message}`);
          });
        this.getRatedMovies(sessionId);
      });
    } catch (error) {
      this.setError(`Произошла ошибка: ${error.message}`);
    }

    this.fetchMovies();
    this.apiMovies.fetchGenres().then((genres) => {
      this.setState({ genres });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleOnlineStatus, {
      passive: true,
    });
    window.removeEventListener("offline", this.handleOnlineStatus, {
      passive: true,
    });
  }

  handleOnlineStatus = () => {
    this.setState({ online: navigator.onLine });
  };

  fetchMovies() {
    const { searchValue, page } = this.state;

    this.apiMovies
      .getAllMovies(searchValue, page)
      .then((data) => {
        if (data.results && data.total_results) {
          this.setState({
            moviesData: data.results,
            totalPages: data.total_pages,
            loading: false,
          });
        } else {
          this.setError("Фильмы не найдены");
          this.setState({
            moviesData: [],
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setError(`Произошла ошибка: ${error.message}`);
        this.setState({
          moviesData: [],
          loading: false,
        });
      });
  }



  rateData = (value, movieId) => {
    this.setState({ value, movieId }, () => {
      this.addRateMovie();
    });
  };

  async addRateMovie() {
    const { movieId, sessionId, value } = this.state;
    try {
      await this.apiRatingMovies.addRateMovies(movieId, sessionId, value);
    } catch (error) {
      this.setError(`Произошла ошибка: ${error.message}`);
    }
  }

  async getRatedMovies(sessionId) {
    try {
      const responseData = await this.apiRatingMovies.getRatedMovies(sessionId);
      this.setState({ ratedMovies: responseData.results });
    } catch (error) {
      this.setError(`Произошла ошибка: ${error.message}`);
    }
  }

  handleTabChange = (activeTab) => {
    this.setState({ activeTab }, () => {
      if (activeTab === "1") {
        this.fetchMovies();
      } else if (activeTab === "2") {
        this.getRatedMovies(this.state.sessionId);
      }
    });
  };


  render() {
    const { moviesData, loading, online, page, totalPages, ratedMovies, activeTab, genres } =
      this.state;

    if (!online) {
      return <div className="offline">no internet, please check your connection...</div>;
    }
    return (
      <MoviesProvider value={genres}>
        <section className="app">
          {this.state.error && <Alert message={this.state.error} type="error" closable />}
          <HeaderBar onChange={this.handleTabChange} />
          {activeTab === "1" && <InputSearch searchChange={this.searchChange} />}
          {activeTab === "1" ? (
            <MoviesList moviesData={moviesData} loading={loading} rateData={this.rateData} />
          ) : (
            <MoviesList moviesData={ratedMovies} loading={loading} rateData={this.rateData} />
          )}
          <Footer page={page} onPageChange={this.handlePageChange} totalPages={totalPages} />
        </section>
      </MoviesProvider>
    );
  }
}

export default App;
