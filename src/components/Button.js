import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  display: block;
  width: 88vw;
  min-width: 20rem;
  max-width: 30rem;
  margin-left: 5%;
  margin-bottom: 3rem;
  padding: 1.8rem 0;
  outline: none;
  border: none;
  box-shadow: 0 0 4px 1px #273b3a;
  font-size: 1.8rem;
  font-weight: 700;
  border-radius: 8px;
  background-color: snow;
  cursor: pointer;

  &:hover {
    background-color: #77c1bb;
    color: #f3f6f6;
    transition: all 0.3s ease 0s;
  }
  &:active {
    background-color: #00de2c;
    color: #f3f6f6;
    box-shadow: 0 0 3px 3px #273b3a;
  }
`;

function CreateButton({ text, handleClick }) {
  return <Button onClick={handleClick}>{text}</Button>;
}

CreateButton.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func,
};

export default CreateButton;
