export default class ApiMovies {
  async getResource(query, page) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODM5YWM1ZDZlYTQ5NTc0NGI3ZDJjNDU4Mzc3NjM3NyIsInN1YiI6IjY0ZWUwY2Q4NGNiZTEyMDExYjkxMTY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YGDovR5zaepjgSBfOUoH4jxONCqrTHHw7A6f0H3WCaE",
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?${query}&include_adult=true&language=en-US&page=${page}`,
      options
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODM5YWM1ZDZlYTQ5NTc0NGI3ZDJjNDU4Mzc3NjM3NyIsInN1YiI6IjY0ZWUwY2Q4NGNiZTEyMDExYjkxMTY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YGDovR5zaepjgSBfOUoH4jxONCqrTHHw7A6f0H3WCaE",
      },
    };

    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch genres");
      }
      const data = await response.json();
      return data.genres;
    } catch (error) {
      console.error("Error fetching genres:", error);
      return [];
    }
  }
}
