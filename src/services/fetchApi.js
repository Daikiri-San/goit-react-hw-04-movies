const key = '259c02d1f1f516a6001436d2cce8084d';
const baseURL = 'https://api.themoviedb.org/3';
const dayTrendingURL = '/trending/movie/day';

export default {
  fetchTrendMovies() {
    return fetch(`${baseURL}${dayTrendingURL}?api_key=${key}`)
      .then(res => res.json())
      .catch(console.log);
  },

  fetchSearchedFilms(query) {
    return fetch(`${baseURL}/search/movie?api_key=${key}&query=${query}`)
      .then(res => res.json())
      .catch(console.log);
  },

  fetchMovieDetails(id) {
    return fetch(`${baseURL}/movie/${id}?api_key=${key}`)
      .then(res => res.json())
      .catch(console.log);
  },

  fetchMovieCast(id) {
    return fetch(`${baseURL}/movie/${id}/credits?api_key=${key}`)
      .then(res => res.json())
      .catch(console.log);
  },

  fetchMovieReviews(id) {
    return fetch(`${baseURL}/movie/${id}/reviews?api_key=${key}`)
      .then(res => res.json())
      .catch(console.log);
  },

  fetchPopularFilms() {
    return fetch(`${baseURL}/movie/popular?api_key=${key}`)
      .then(res => res.json())
      .catch(console.log);
  },
};
