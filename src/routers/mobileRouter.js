import React from 'react';
import { Route } from 'react-router-dom';
import MobileRedirect from '../components/mobile/MobileRedirect';

export const MobileRouters = () => {
  return <Route path="/mobileRedirect" component={MobileRedirect} />;
};
