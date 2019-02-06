import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../components/forms/Login';
import Test from '../components/Test';

export const rootRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/test',
    component: Test,
  },
];

const fakeAuth = ({ user }) => {
  return user.authenticated;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export const makeRootRoutes = rootRoutes.map((routeItem, index) => (
  <Route key={index} path={routeItem.path} component={routeItem.component} />
));
