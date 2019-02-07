import React from 'react';
import { Button } from 'antd';
// action: scan
// action: add device
const deviceSettings = () => {
  return (
    <div>
      <div className="toolbar">
        <Button type="default" icon="plus">
          Search
        </Button>
        <Button type="primary" icon="plus">
          Scan
        </Button>
      </div>
    </div>
  );
};

export default deviceSettings;
