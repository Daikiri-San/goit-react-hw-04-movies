import React, { Component } from 'react';
import styled from 'styled-components';
import getQueryParams from '../utils/parseQueryString';
import fetchApi from '../services/fetchApi';
import ListOfMovies from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';
import IntObsInfiniteScroll from '../components/IntObsInfiniteScroll';

const Container = styled.div`
  margin: 0 auto;
  width: 92vw;
  min-width: 30rem;
  max-width: 100%;
`;

class Movies extends Component {
  state = {
    moviesList: [],
    loading: false,
    error: null,
    searched: false,
    allResultsGotten: true,
    DefaultOrSearchFetch: true,
  };

  componentDidMount() {
    fetchApi.popularMovies.page = 1;
    fetchApi.searchMovies.page = 1;
    const { location } = this.props;
    const { query } = getQueryParams(location.search);
    if (query) {
      this.setState({
        DefaultOrSearchFetch: false,
      });
      return this.fetchMoviesOnSearchQuery();
    }
    this.fetchPopularMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;

    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(location.search);
    if (prevQuery !== nextQuery && !nextQuery) {
      this.setState({
        loading: true,
        moviesList: [],
        searched: false,
      });
      fetchApi.popularMovies.page = 1;
      return this.fetchPopularMovies();
    }
    if (prevQuery !== nextQuery) {
      this.setState({
        loading: true,
        moviesList: [],
        searched: false,
      });
      return this.fetchfromSubmit();
    }
  }

  fetchPopularMovies = () => {
    this.setState({
      loading: true,
    });
    fetchApi.popularMovies
      .fetchMovies()
      .then(resolve => {
        this.setState(prevState => ({
          moviesList: [...prevState.moviesList, ...resolve.results],
          allResultsGotten: fetchApi.popularMovies.page === resolve.total_pages,
          DefaultOrSearchFetch: true,
        }));
        fetchApi.popularMovies.page += 1;
      })
      .catch(error => this.setState({ error }))
      .finally(
        this.setState({
          loading: false,
        }),
      );
  };

  fetchMoviesOnSearchQuery = () => {
    const { location } = this.props;
    this.setState({
      loading: true,
    });
    const { query } = getQueryParams(location.search);
    fetchApi.searchMovies
      .fetchMovies(query)
      .then(resolve => {
        this.setState(prevState => ({
          moviesList: [...prevState.moviesList, ...resolve.results],
          allResultsGotten: fetchApi.searchMovies.page === resolve.total_pages,
        }));
        fetchApi.searchMovies.page += 1;
      })
      .catch(error => this.setState({ error }))
      .finally(
        this.setState({
          loading: false,
        }),
      );
  };

  fetchfromSubmit = () => {
    this.fetchMoviesOnSearchQuery();
    setTimeout(
      () =>
        this.setState({
          searched: true,
        }),
      400,
    );
  };

  handleChangeQuery = query => {
    this.setState({
      allResultsGotten: true,
      DefaultOrSearchFetch: false,
    });
    fetchApi.searchMovies.page = 1;
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  render() {
    const {
      moviesList,
      loading,
      error,
      searched,
      allResultsGotten,
      DefaultOrSearchFetch,
    } = this.state;
    const { location } = this.props;

    // console.log('allResultsGotten', allResultsGotten);
    // console.log('DefaultOrSearchFetch', DefaultOrSearchFetch);

    return (
      <Container>
        <SearchBar handleChangeQuery={this.handleChangeQuery} />
        {error && (
          <Notification
            message={`Whoops... something went wrong: ${error.message}`}
          />
        )}
        {loading && <Spinner />}
        {moviesList.length > 0 && (
          <ListOfMovies moviesList={moviesList} location={location} />
        )}
        {moviesList.length === 0 && !loading && searched && (
          <Notification
            message={`There are no such movies... Try another one :)`}
          />
        )}
        {!allResultsGotten && DefaultOrSearchFetch && (
          <IntObsInfiniteScroll fetchFunction={this.fetchPopularMovies} />
        )}
        {!allResultsGotten && !DefaultOrSearchFetch && (
          <IntObsInfiniteScroll fetchFunction={this.fetchMoviesOnSearchQuery} />
        )}
      </Container>
    );
  }
}

export default Movies;
