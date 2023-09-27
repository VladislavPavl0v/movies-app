export const BASE_URL = "https://api.themoviedb.org/3";
export const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODM5YWM1ZDZlYTQ5NTc0NGI3ZDJjNDU4Mzc3NjM3NyIsInN1YiI6IjY0ZWUwY2Q4NGNiZTEyMDExYjkxMTY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YGDovR5zaepjgSBfOUoH4jxONCqrTHHw7A6f0H3WCaE";

export default class ApiMovies {
  async getResource(query, page) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: TOKEN,
      },
    };

    const res = await fetch(
      `${BASE_URL}/search/movie?${query}&include_adult=true&language=en-US&page=${page}`,
      options,
    );

    if (!res.ok) {
      throw new Error(`Could not fetch , received ${res.status}`);
    }
    return await res.json();
  }

  async getAllMovies(searchValue, page) {
    searchValue = searchValue || "return";
    const data = await this.getResource(`query=${searchValue}`, page);

    if (data.results && data.results.length > 0) {
      return data;
    } else {
      throw new Error("No movies found");
    }
  }

  async fetchGenres() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: TOKEN,
      },
    };

    try {
      const response = await fetch(`${BASE_URL}/genre/movie/list?language=en`, options);
      if (!response.ok) {
        throw new Error("Failed to fetch genres");
      }
      const data = await response.json();
      return data.genres;
    } catch (error) {
      return [];
    }
  }
}
