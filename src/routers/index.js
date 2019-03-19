import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../components/forms/Login';
import Test from '../components/Test';
import { deviceSettingsRoutes } from './SettingsRouter';
import { monitorRouters } from './monitorRouter';
export { deviceSettingsRoutes } from './SettingsRouter';
export * from './monitorRouter';
export { MobileRouters } from './mobileRouter';

const rootRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/test',
    component: Test,
  },
];

export const makeRootRoutes = rootRoutes.map((routeItem, index) => (
  <Route key={index} path={routeItem.path} component={routeItem.component} />
));

const fakeAuth = ({ user }) => {
  return user.authenticated;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dimenstion = window.innerWidth || document.documentElement.clientWidth;

  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth({ user: { authenticated: true } }) ? (
          dimenstion > 600 ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/mobileRedirect',
                state: { from: props.location },
              }}
            />
          )
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

export const makeSettingsRouters = deviceSettingsRoutes.map(item => (
  <PrivateRoute
    path={item.to}
    component={item.component}
    to={item.to}
    key={item.key.toString()}
  />
));

export const makeMonitorRouters = monitorRouters.map(item => (
  <PrivateRoute
    path={item.to}
    component={item.component}
    to={item.to}
    key={item.key.toString()}
  />
));
