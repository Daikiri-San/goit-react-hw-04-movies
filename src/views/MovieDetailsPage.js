import React, { Component, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import fetchApi from '../services/fetchApi';
import routesPaths from '../routesPaths';
import DetailsNavigation from '../components/DetailsNavigation';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';

const Cast = lazy(() => import('./Cast'));
const Reviews = lazy(() => import('./Reviews'));

const Container = styled.div`
  width: 88vw;
  min-width: 30rem;
  max-width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 4rem;
`;

const MoviePoster = styled.img.attrs(({ src, alt }) => ({
  src: src
    ? `http://image.tmdb.org/t/p/w500${src}`
    : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png',

  alt: `Poster of ${alt}` || 'Poster',
}))`
  margin: 0 auto;
  min-width: 20rem;
  max-width: 40rem;
  object-fit: cover;
  height: 100%;
`;

const Title = styled.h1`
  display: inline-block;
  margin: 2rem auto;
  font-size: 2rem;
  font-weight: 500;

  @media screen and (min-width: 48em) {
    font-size: 2.6rem;
  }
`;

const List = styled.ul`
  min-width: 220px;
  width: 40%;

  @media screen and (min-width: 48em) {
    width: 45%;
  }

  @media screen and (min-width: 64em) {
    width: 50%;
  }
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;

  @media screen and (min-width: 48em) {
    align-items: flex-start;
  }
`;

const Text = styled.p`
  font-size: 1.6rem;

  @media screen and (min-width: 48em) {
    font-size: 2rem;
  }
`;

const SemiTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 1rem;

  @media screen and (min-width: 48em) {
    font-size: 2.4rem;
  }
`;

class MovieDetailsPage extends Component {
  state = {
    exactMovie: null,
    loading: false,
    error: null,
    realState: null,
  };

  componentDidMount() {
    const {
      location: { state },
    } = this.props;
    this.setState({
      loading: true,
    });
    const { match } = this.props;
    fetchApi
      .fetchMovieDetails(match.params.movieId)
      .then(result => {
        this.setState({
          exactMovie: result,
          realState: state,
        });
      })
      .catch(error => this.setState({ error }))
      .finally(
        this.setState({
          loading: false,
        }),
      );
  }

  handleGoBack = () => {
    const { history } = this.props;
    const { realState } = this.state;
    console.log(realState);
    if (realState && realState.from) {
      return history.push(realState.from);
    }
    history.push(routesPaths.movies);
  };

  render() {
    const { exactMovie, loading, error } = this.state;
    const { match } = this.props;

    return (
      <>
        <Button text="⬅ Back" handleClick={this.handleGoBack} />
        {error && (
          <Notification
            message={`Whoops... something went wrong: ${error.message}`}
          />
        )}
        {exactMovie && (
          <>
            <Container>
              {loading && <Spinner />}
              <MoviePoster
                src={exactMovie.poster_path}
                alt={exactMovie.title}
              />
              <List>
                <ListItem>
                  <Title>
                    {exactMovie.title} ({exactMovie.release_date.slice(0, 4)})
                  </Title>
                </ListItem>
                <ListItem>
                  <Text>User Score: {exactMovie.vote_average * 10}%</Text>
                </ListItem>
                <ListItem>
                  <SemiTitle>Genre</SemiTitle>
                  <Text>{exactMovie.genres.map(e => e.name).join(', ')}</Text>
                </ListItem>
                <ListItem>
                  <SemiTitle>Overview</SemiTitle>
                  <Text>{exactMovie.overview}</Text>
                </ListItem>
              </List>
            </Container>
            <DetailsNavigation
              castMatch={`${match.url}/cast`}
              reviewMatch={`${match.url}/reviews`}
            />
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route path={`${match.path}/cast`} component={Cast} />
                <Route path={`${match.path}/reviews`} component={Reviews} />
              </Switch>
            </Suspense>
          </>
        )}
      </>
    );
  }
}

export default MovieDetailsPage;
