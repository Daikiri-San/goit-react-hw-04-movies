import { lazy } from 'react';

export default [
  {
    path: '/',
    label: 'HomePage',
    exact: true,
    component: lazy(() =>
      import('./views/HomePage' /* webpackChunkName: "movies-home" */),
    ),
  },
  {
    path: '/movies/:movieId',
    label: 'MovieDetailsPage',
    exact: false,
    component: lazy(() =>
      import('./views/MovieDetailsPage' /* webpackChunkName: "movies-page" */),
    ),
  },
  {
    path: '/movies',
    label: 'MoviesPage',
    exact: false,
    component: lazy(() =>
      import('./views/MoviesPage' /* webpackChunkName: "movies-exactMovie" */),
    ),
  },
];
