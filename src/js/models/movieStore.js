/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import api from '../service/apiServiceOMDB';

class MoviesStore {
  constructor(api) {
    this.api = api;
    this.searchResult = null;
    this.fullDescMovies = null;
    this.totalResponseLength = null;
    this.totalResults = null;
  }

  async searchMovies(movieTitle, page) {
    const response = await this.api.searchMovies(movieTitle, page);
    if (response) {
      if (!JSON.parse(response.Response.toLowerCase())) {
        return response;
      }
      this.searchResult = response.Search;
      this.totalResults = response.totalResults;
      this.fullDescMovies = await this.getFullDescMovies(this.searchResult);
    } else {
      return null;
    }

    return this.fullDescMovies;
  }

  async getFullDescMovies(searchResult) {
    return searchResult.reduce(async (acc, movieShortDesc) => {
      const sumArr = await acc;
      const fullDescMovie = await this.api.getMovieByID(movieShortDesc.imdbID);
      let tempObj = {};
      if (fullDescMovie.Response === 'True') {
        let rating = fullDescMovie.Ratings.length ? fullDescMovie.Ratings[0].Value : null;
        rating ? rating = rating.slice(0, rating.indexOf('/')) : rating = 'N/A';
        tempObj = {
          titleLink: `https://www.imdb.com/title/${fullDescMovie.imdbID}`,
          title: fullDescMovie.Title,
          year: fullDescMovie.Year,
          poster: fullDescMovie.Poster !== 'N/A' ? fullDescMovie.Poster : '',
          rating,
        };
      } else {
        tempObj = {
          titleLink: `https://www.imdb.com/title/${movieShortDesc.imdbID}`,
          title: movieShortDesc.Title,
          year: movieShortDesc.Year,
          poster: movieShortDesc.Poster !== 'N/A' ? movieShortDesc.Poster : '',
          rating: 'N/A',
        };
      }

      sumArr.push(tempObj);
      return sumArr;
    }, []);
  }

  getTotalResults() {
    return this.totalResults;
  }
}

const moviesStore = new MoviesStore(api);

export default moviesStore;
