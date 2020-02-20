import React, { Component } from 'react';
import styled from 'styled-components';
import fetchApi from '../services/fetchApi';
import MovieList from '../components/MovieList';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';

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
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    fetchApi
      .fetchTrendMovies()
      .then(({ results }) => {
        this.setState({
          moviesTrends: results,
        });
      })
      .catch(error => this.setState({ error }))
      .finally(
        this.setState({
          loading: false,
        }),
      );
  }

  render() {
    const { moviesTrends, loading, error } = this.state;
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
      </Container>
    );
  }
}

export default HomePage;
