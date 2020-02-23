import React, { Component, lazy, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import routes from '../routes';
import Layout from './Layout';
import Spinner from './Spinner';
import '../base.css';

const HomePage = lazy(() => import('../views/HomePage'));
const MovieDetailsPage = lazy(() => import('../views/MovieDetailsPage'));
const MoviesPage = lazy(() => import('../views/MoviesPage'));

class App extends Component {
  render() {
    return (
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path={routes.home} exact component={HomePage} />
            <Route path={routes.movieDetails} component={MovieDetailsPage} />
            <Route path={routes.movies} component={MoviesPage} />
            <Redirect to={routes.home} />
          </Switch>
        </Suspense>
      </Layout>
    );
  }
}

export default App;
