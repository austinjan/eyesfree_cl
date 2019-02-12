import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../components/forms/Login';
import Test from '../components/Test';
import { deviceSettingsRoutes } from './SettingsRouter';
export { deviceSettingsRoutes } from './SettingsRouter';

const mapStateToProps = (state, ownProps) => {
  // return {
  //   active: ownProps.filter === state.visibilityFilter,
  // };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // return {
  //   onClick: () => {
  //     dispatch(setVisibilityFilter(ownProps.filter));
  //   },
  // };
};

const makeRoute = () => {};

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
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth({ user: { authenticated: true } }) ? (
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

export const makeSettingsRouters = deviceSettingsRoutes.map(item => (
  <PrivateRoute
    path={item.to}
    component={item.component}
    to={item.to}
    key={item.key.toString()}
  />
));
