import React, { Component } from 'react';
import styled from 'styled-components';
import fetchApi from '../services/fetchApi';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';

const List = styled.ul`
  min-width: 320px;
  width: 100%;
  text-align: center;
`;

const ListItem = styled.li`
  max-width: 90%;
  margin-left: 5%;
  margin-bottom: 6rem;
  &:not(:last-of-type) {
    padding-bottom: 4rem;
    border-bottom: 0.4rem solid #333333;
  }
`;

const Title = styled.h3`
  margin: 2rem 0;
  font-size: 2rem;
  font-weight: 500;

  @media screen and (min-width: 48em) {
    font-size: 2.6rem;
  }
`;

const Text = styled.p`
  font-size: 1.6rem;

  &:not(:last-of-type) {
    margin-bottom: 0.4rem;
  }

  @media screen and (min-width: 48em) {
    font-size: 2rem;
    line-height: 3rem;
  }
`;

class MovieReviews extends Component {
  state = {
    reviews: null,
    loading: false,
    error: null,
  };
  componentDidMount() {
    this.setState({
      loading: true,
    });
    const { match } = this.props;
    fetchApi
      .fetchMovieReviews(match.params.movieId)
      .then(({ results }) =>
        this.setState({
          reviews: results,
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
    const { reviews, loading, error } = this.state;
    return (
      <>
        {error && (
          <Notification
            message={`Whoops... something went wrong: ${error.message}`}
          />
        )}
        {loading && <Spinner />}
        {reviews &&
          (reviews.length > 0 ? (
            <List>
              {reviews.map(review => (
                <ListItem key={review.id}>
                  <Title>{review.author}</Title>
                  <Text>{review.content}</Text>
                </ListItem>
              ))}
            </List>
          ) : (
            <Title>There are no reviews for this movie :(</Title>
          ))}
      </>
    );
  }
}

export default MovieReviews;
