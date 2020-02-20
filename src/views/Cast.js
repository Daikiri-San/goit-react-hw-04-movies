import React, { Component } from 'react';
import styled from 'styled-components';
import fetchApi from '../services/fetchApi';
import CastItem from '../components/CastItem';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';

const List = styled.ul`
  min-width: 320px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Text = styled.p`
  font-size: 2rem;
  font-weight: 500;

  @media screen and (min-width: 48em) {
    font-size: 2.6rem;
  }
`;

class MovieCast extends Component {
  state = {
    cast: null,
    loading: false,
    error: null,
  };
  componentDidMount() {
    this.setState({
      loading: true,
    });
    const { match } = this.props;
    fetchApi
      .fetchMovieCast(match.params.movieId)
      .then(({ cast }) =>
        this.setState({
          cast,
        }),
      )
      .catch(error => this.setState({ error }))
      .finally(
        this.setState({
          loading: false,
        }),
      );
  }
  render() {
    const { cast, loading, error } = this.state;
    return (
      <>
        {error && (
          <Notification
            message={`Whoops... something went wrong: ${error.message}`}
          />
        )}
        {loading && <Spinner />}
        {cast && cast.length > 0 ? (
          <List>
            {cast.map(({ id, name, profile_path, character }) => (
              <CastItem
                key={id}
                avatar={profile_path}
                name={name}
                character={character}
              />
            ))}
          </List>
        ) : (
          <Text>There are no cast for this movie</Text>
        )}
      </>
    );
  }
}

export default MovieCast;
