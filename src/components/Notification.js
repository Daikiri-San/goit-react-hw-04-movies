import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  display: inline-block;
  margin: 0 auto;
  font-weight: 700;
  margin-top: 8rem;
  font-size: 2rem;

  @media screen and (min-width: 48em) {
    font-size: 3rem;
  }
  @media screen and (min-width: 64em) {
    font-size: 4rem;
  }
`;

function Notification({ message }) {
  return <Text>{message}</Text>;
}

export default Notification;
