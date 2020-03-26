import React, { Component, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import routes from '../routes';
import routesPaths from '../routesPaths';
import Layout from './Layout';
import Spinner from './Spinner';
import '../base.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Switch>
            {routes.map(route => (
              <Route key={route.path} {...route} />
            ))}
            <Redirect to={routesPaths.home} />
          </Switch>
        </Suspense>
      </Layout>
    );
  }
}

export default App;
