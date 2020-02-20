import React, { Component } from 'react';
import styled from 'styled-components';
import getQueryParams from '../utils/parseQueryString';
import fetchApi from '../services/fetchApi';
import ListOfMovies from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';

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
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    const { location } = this.props;
    const { query } = getQueryParams(location.search);
    if (query) {
      return this.fetchMoviesOnSearchQuery(query);
    }
    fetchApi
      .fetchPopularFilms()
      .then(({ results }) => {
        this.setState({
          moviesList: results,
        });
      })
      .catch(error => this.setState({ error }))
      .finally(setTimeout(this.completeSearch, 200));
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;

    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(location.search);
    if (prevQuery !== nextQuery) {
      this.setState({
        loading: true,
      });
      return this.fetchMoviesOnSearchQuery(nextQuery);
    }
  }

  completeSearch = () => {
    this.setState({
      loading: false,
    });
  };

  fetchMoviesOnSearchQuery = query => {
    this.setState({
      loading: false,
    });

    fetchApi
      .fetchSearchedFilms(query)
      .then(({ results }) => {
        this.setState({
          moviesList: results,
        });
      })
      .catch(error => this.setState({ error }))
      .finally(setTimeout(this.completeSearch, 200));
  };

  handleChangeQuery = query => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  render() {
    const { moviesList, loading, error } = this.state;
    const { location } = this.props;

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
        {moviesList.length === 0 && !loading && (
          <Notification
            message={`There are no such movies... Try another one :)`}
          />
        )}
      </Container>
    );
  }
}

export default Movies;
