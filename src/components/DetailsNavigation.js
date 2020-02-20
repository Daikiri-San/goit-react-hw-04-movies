import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const List = styled.nav`
  padding: 2rem 4rem;
  width: 100%;
  margin-bottom: 4rem;
  display: flex;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`;

const ListItem = styled(NavLink).attrs(props => ({
  activeClassName: props.activeClassName || 'activeLink',
}))`
  font-size: 2.4rem;
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

function DetailsNavigation({ castMatch, reviewMatch }) {
  return (
    <List>
      <ListItem to={castMatch}>Cast</ListItem>
      <ListItem to={reviewMatch}>Reviews</ListItem>
    </List>
  );
}

DetailsNavigation.propTypes = {
  castMatch: PropTypes.string.isRequired,
  reviewMatch: PropTypes.string.isRequired,
};

export default DetailsNavigation;
