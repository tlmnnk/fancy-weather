/* eslint-disable no-shadow */
import axios from 'axios';
import config from '../config/apiConfig';

class Api {
  constructor(config) {
    this.url = config.omdb.url;
    this.apiKey = config.omdb.apiKey;
  }

  async searchMovies(searchInput, page = 1) {
    try {
      const response = await axios.get(`${this.url}`, {
        params: {
          apikey: this.apiKey,
          s: searchInput,
          page,
        },
      });
      return response.data;
    } catch (err) {
      return false;
    }
  }

  async getMovieByID(movieID) {
    try {
      const response = await axios.get(`${this.url}`, {
        params: {
          apikey: this.apiKey,
          i: movieID,
        }
      });
      return response.data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const api = new Api(config);

export default api;
