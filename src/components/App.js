import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import routes from '../routes';
import Layout from './Layout';
import HomePage from '../views/HomePage';
import MoviesPage from '../views/MoviesPage';
import MovieDetailsPage from '../views/MovieDetailsPage';
import '../base.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path={routes.home} exact component={HomePage} />
          <Route path={routes.movieDetails} component={MovieDetailsPage} />
          <Route path={routes.movies} component={MoviesPage} />
          <Redirect to={routes.home} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
