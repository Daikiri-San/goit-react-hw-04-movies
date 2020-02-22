import React, { Component } from 'react';
import styled from 'styled-components';
import fetchApi from '../services/fetchApi';
import MovieList from '../components/MovieList';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';
import IntObsInfiniteScroll from '../components/IntObsInfiniteScroll';

const Container = styled.div`
  margin: 0 auto;
  width: 92vw;
  min-width: 30rem;
  max-width: 100%;
`;

const Title = styled.h1`
  display: inline-block;
  margin-left: 5%;
  font-size: 4rem;
  font-weight: 500;
  margin-bottom: 5rem;
`;

class HomePage extends Component {
  state = {
    moviesTrends: [],
    loading: false,
    error: null,
    allResultsGotten: true,
  };

  componentDidMount() {
    fetchApi.trendMovies.page = 1;
    this.fetchTrendMovies();
  }

  fetchTrendMovies = () => {
    this.setState({
      loading: true,
    });
    fetchApi.trendMovies
      .fetchMovies()
      .then(resolve => {
        this.setState(prevState => ({
          moviesTrends: [...prevState.moviesTrends, ...resolve.results],
          allResultsGotten: fetchApi.trendMovies.page === resolve.total_pages,
        }));
        fetchApi.trendMovies.page += 1;
      })
      .catch(error => this.setState({ error }))
      .finally(
        this.setState({
          loading: false,
        }),
      );
  };

  render() {
    const { moviesTrends, loading, error, allResultsGotten } = this.state;
    const { location } = this.props;

    return (
      <Container>
        {error ? (
          <Notification
            message={`Whoops... something went wrong: ${error.message}`}
          />
        ) : (
          <Title>Trending today</Title>
        )}
        {loading && <Spinner />}
        {moviesTrends.length > 0 && (
          <MovieList moviesList={moviesTrends} location={location} />
        )}
        {!allResultsGotten && (
          <IntObsInfiniteScroll fetchFunction={this.fetchTrendMovies} />
        )}
      </Container>
    );
  }
}

export default HomePage;
