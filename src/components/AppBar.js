import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

const Header = styled.header`
  width: 100%;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 4rem;
`;

const Appbar = () => (
  <Header>
    <Navigation />
  </Header>
);

export default Appbar;
