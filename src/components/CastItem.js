import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 43%;
  max-width: 20rem;
  height: 20rem;
  border-radius: 10px;
  margin-bottom: 10rem;

  @media screen and (min-width: 30em) {
    width: 32%;
    height: 24rem;
  }

  @media screen and (min-width: 48em) {
    height: 30rem;
    margin-right: 10px;
  }

  @media screen and (min-width: 64em) {
    height: 400px;
    width: 19%;
    max-width: 30rem;
    margin-bottom: 9rem;
    margin-right: 0;
  }

  @media screen and (min-width: 75em) {
    height: 40rem;
  }

  @media screen and (min-width: 90em) {
    width: 16%;
  }

  @media screen and (min-width: 105em) {
    width: 13%;
  }
`;

const Text = styled.p`
  font-size: 1.6rem;

  &:not(:last-of-type) {
    margin-bottom: 0.4rem;
  }

  @media screen and (min-width: 48em) {
    font-size: 2rem;
  }
`;

const ProfileAvatar = styled.img.attrs(({ src, alt }) => ({
  src:
    src ||
    'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png',

  alt: `Avatar of ${alt}` || 'Avatar',
}))`
  margin: 0 auto;
  margin-bottom: 0.6rem;
  min-width: 7rem;
  max-width: 30rem;
  object-fit: cover;
  height: 100%;
`;

function CastItem({ avatar, name, character }) {
  if (avatar) {
    avatar = `http://image.tmdb.org/t/p/w500${avatar}`;
  }
  return (
    <Item>
      <ProfileAvatar src={avatar} alt={name} />
      <Text>{name}</Text>
      <Text>Character: {character}</Text>
    </Item>
  );
}

CastItem.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  character: PropTypes.string,
};

CastItem.defaultProps = {
  avatar:
    'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png',
  name: 'Unknown',
};

export default CastItem;
