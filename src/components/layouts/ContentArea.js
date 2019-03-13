import React from 'react';

import {
  makeRootRoutes,
  makeSettingsRouters,
  makeMonitorRouters,
  MobileRouters,
} from '../../routers';

const contentArea = () => {
  return (
    <div>
      {makeRootRoutes}
      {makeSettingsRouters}
      {makeMonitorRouters}
      <MobileRouters />
    </div>
  );
};

export default contentArea;
