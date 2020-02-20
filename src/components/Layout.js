import React from 'react';
import styled from 'styled-components';
import AppBar from './AppBar';

const Container = styled.div`
  max-width: 100vw;
`;

const Layout = ({ children }) => (
  <Container>
    <AppBar />
    {children}
  </Container>
);

export default Layout;
