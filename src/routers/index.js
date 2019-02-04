import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../components/login/Login';

export const rootRoutes = [
  {
    path: '/login',
    component: Login,
  },
];

export const makeRootRoutes = rootRoutes.map((routeItem, index) => (
  <Route key={index} path={routeItem.path} component={routeItem.component} />
));
