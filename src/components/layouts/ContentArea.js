import React from 'react';

import {
  makeRootRoutes,
  makeSettingsRouters,
  MobileRouters,
} from '../../routers';

const contentArea = () => {
  return (
    <div>
      {makeRootRoutes}
      {makeSettingsRouters}
      <MobileRouters />
    </div>
  );
};

export default contentArea;
