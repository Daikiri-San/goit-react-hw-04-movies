import React, { Component } from 'react';
import IntObserver from '../utils/IntObserver';

class IntObsInfiniteScroll extends Component {
  guardian = React.createRef();

  componentDidMount() {
    const { fetchFunction } = this.props;
    IntObserver(this.guardian.current, fetchFunction);
  }

  render() {
    return <div ref={this.guardian}></div>;
  }
}

export default IntObsInfiniteScroll;
