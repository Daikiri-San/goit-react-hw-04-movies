import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import routesPaths from '../routesPaths';

const Nav = styled.nav`
  padding: 2rem 4rem;
  display: flex;
`;

const Item = styled(NavLink).attrs(props => ({
  activeClassName: props.activeClassName || 'activeLink',
}))`
  font-size: 3rem;
  font-weight: 500;
  text-decoration: none;
  color: #333333;
  transition: color 0.2s linear;

  &:not(:first-of-type) {
    margin-left: 2rem;
  }

  &:hover {
    color: #4a70f7;
  }
`;

function Navigation() {
  return (
    <Nav>
      <Item to={routesPaths.home} exact>
        Home
      </Item>
      <Item to={routesPaths.movies}>Movies</Item>
    </Nav>
  );
}

export default Navigation;
