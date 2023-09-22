import axios from "axios";

const apiKey = "2839ac5d6ea495744b7d2c4583776377";
export default class ApiRatingMovies {
  async guestSession() {
    try {
      const response = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/authentication/guest_session/new",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODM5YWM1ZDZlYTQ5NTc0NGI3ZDJjNDU4Mzc3NjM3NyIsInN1YiI6IjY0ZWUwY2Q4NGNiZTEyMDExYjkxMTY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YGDovR5zaepjgSBfOUoH4jxONCqrTHHw7A6f0H3WCaE",
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async addRateMovies(movieId, sessionId, value) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}`;

    const data = {
      value,
    };

    const headers = {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    };

    const params = {
      guest_session_id: sessionId,
    };

    try {
      const response = await axios.post(url, data, { headers, params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getRatedMovies(sessionId) {
    const url = `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${apiKey}`;

    const params = {
      language: "en-US",
      sort_by: "created_at.asc",
      page: "1",
    };
    const headers = {
      accept: "application/json",
    };

    try {
      const response = await axios.get(url, { params, headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
