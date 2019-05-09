import React, { useState } from 'react';

import {
  makeRootRoutes,
  makeSettingsRouters,
  makeMonitorRouters,
  MobileRouters,
} from 'Routers';

const contentArea = () => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
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
