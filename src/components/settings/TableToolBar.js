import React from 'react';
import { Button } from 'antd';

const tableToolBar = ({ addDevice }) => {
  return (
    <div className="toolbar">
      <Button type="primary" icon="search" style={{ margin: '5px' }}>
        Scan
      </Button>
      <Button
        type="default"
        icon="plus"
        onClick={addDevice}
        style={{ margin: '5px' }}
      >
        Add
      </Button>
    </div>
  );
};

export default tableToolBar;
