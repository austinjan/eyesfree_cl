import React from 'react';

import {
  makeRootRoutes,
  makeSettingsRouters,
  makeMonitorRouters,
  MobileRouters,
} from 'Routers';

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
