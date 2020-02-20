import React from 'react';
import styled from 'styled-components';
import MovieListItem from '../components/MovieListItem';

const List = styled.ul`
  min-width: 320px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;

  @media screen and (min-width: 48em) {
    justify-content: space-evenly;
  }
`;

function MovieList({ moviesList, location }) {
  return (
    <List>
      {moviesList.map(
        ({ id, vote_average, title, release_date, poster_path }) => (
          <MovieListItem
            key={id}
            id={id}
            title={title}
            votes={vote_average}
            releaseDate={release_date}
            poster={poster_path}
            location={location}
          />
        ),
      )}
    </List>
  );
}

export default MovieList;
