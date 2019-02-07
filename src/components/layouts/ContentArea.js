import React from 'react';

import { makeRootRoutes, makeSettingsRouters } from '../../routers';

const contentArea = () => {
  return (
    <div>
      {makeRootRoutes}
      {makeSettingsRouters}
    </div>
  );
};

export default contentArea;
