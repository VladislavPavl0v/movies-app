export default class ApiMovies {
  _apiBase = "https://api.themoviedb.org/3/search/movie";

  async getResource() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjA0MWE5MjRhY2Y3MjBhYWIyOTc2ZmRlZjE0YWQ0YSIsInN1YiI6IjY0ZWUwY2Q4NGNiZTEyMDExYjkxMTY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SiJ7rrxEWu3QL_MOInxC7Q9MmiiMU4WPHTtUSu8AG0s'
      },
    };

    const res = await fetch(
      `${this._apiBase}?query=return&include_adult=true&language=en-US&page=1`,
      options
    );

    if (!res.ok) {
      throw new Error(
        `Could not fetch ${this._apiBase}, received ${res.status}`
      );
    }
    return await res.json();
  }

  getAllMovies() {
    return this.getResource();
  }
}



const api = new ApiMovies();

api
  .getAllMovies()
  .then((item) => {
    // Вывести полученные данные в консоль
    console.log(item);
  })
  .catch((error) => {
    console.error(error); // Обработка ошибок, если что-то пошло не так
  });
