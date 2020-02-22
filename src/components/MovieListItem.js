import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import routes from '../routes';
import PropTypes from 'prop-types';

const Item = styled.li`
  position: relative;
  flex-basis: 306px;
  height: 156px;
  border-radius: 10px;
  margin-bottom: 3rem;

  @media screen and (min-width: 48em) {
    height: 200px;
    flex-basis: 40%;
    margin-right: 10px;
    margin-bottom: 6rem;
  }

  @media screen and (min-width: 64em) {
    height: 400px;
    flex-basis: 21%;
    margin-right: 0;
    margin-bottom: 4rem;
  }

  @media screen and (min-width: 75em) {
    height: 500px;
  }

  @media screen and (min-width: 90em) {
    flex-basis: 18%;
  }

  @media screen and (min-width: 105em) {
    flex-basis: 17%;
    height: 700;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(240, 240, 240, 0) 50%,
    rgba(71, 71, 71, 0.5) 73%,
    rgba(17, 17, 17, 0.5) 85%,
    rgba(19, 19, 19, 0.5) 100%
  );
  cursor: pointer;
`;

const MovieRate = styled.div`
  position: absolute;
  font-weight: 500;
  width: 30px;
  height: 16px;
  border-radius: 6px;
  right: 8px;
  top: 8px;
  line-height: 16px;
  font-size: 1.4rem;
  color: #333333;
  background-color: snow;
  text-align: center;

  @media screen and (min-width: 75em) {
    border-radius: 8px;
    width: 40px;
    height: 18px;
    line-height: 20px;
    font-size: 16px;
  }
`;

const MovieTitle = styled.p`
  position: absolute;
  font-size: 1.6rem;
  font-weight: 500;
  color: snow;
  bottom: 2rem;
  left: 10px;
`;

const MoviePoster = styled.img.attrs(({ src, alt }) => ({
  src:
    src ||
    'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png',

  alt: `Poster of ${alt}` || 'Poster',
}))`
  object-fit: cover;
  height: 100%;
`;

function MovieListItem({ id, title, votes, releaseDate, poster, location }) {
  if (poster) {
    poster = `http://image.tmdb.org/t/p/w500${poster}`;
  }
  return (
    <Item>
      <Link
        to={{ pathname: `${routes.movies}/${id}`, state: { from: location } }}
      >
        <Overlay>
          <MovieRate>{votes}</MovieRate>
          <MovieTitle>
            {title} ({releaseDate.slice(0, 4)})
          </MovieTitle>
        </Overlay>
        <MoviePoster src={poster} alt={title} />
      </Link>
    </Item>
  );
}

MovieListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  releaseDate: PropTypes.string,
  poster: PropTypes.string,
  location: PropTypes.object,
};

MovieListItem.defaultProps = {
  poster:
    'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png',
  votes: 0,
  releaseDate: ' -- -12-31',
};

export default MovieListItem;
